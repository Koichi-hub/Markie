using AutoMapper;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Server.Configuration;
using Server.Core.Entities;
using Server.Core.Enums;
using Server.Database;
using Server.Services.Interfaces;
using Server.Services.Models;
using System.Text.Json;

namespace Server.Services
{
    public class AuthService : IAuthService
    {
        private readonly IJWTService _jWTService;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly OAuthSettings _oauthSettings;
        private readonly DatabaseContext _databaseContext;
        private readonly IMapper _mapper;

        public AuthService(
            IOptions<OAuthSettings> oauthSettingsAccessor, 
            IHttpClientFactory httpClientFactory, 
            DatabaseContext databaseContext,
			IMapper mapper,
            IJWTService jWTService
        )
        {
            _oauthSettings = oauthSettingsAccessor.Value;
            _httpClientFactory = httpClientFactory;
            _databaseContext = databaseContext;
			_mapper = mapper;
            _jWTService = jWTService;
		}

        public async Task<(string, UserDto)> AuthViaGoogle(string code)
        {
            var google = _oauthSettings.Google;
            var httpClient = _httpClientFactory.CreateClient();

            // auth
            var response = await httpClient.PostAsync(
                google.TokenUri,
                new FormUrlEncodedContent(new List<KeyValuePair<string, string>>
                {
                    new KeyValuePair<string, string>("client_id", google.ClientId),
                    new KeyValuePair<string, string>("client_secret", google.ClientSecret),
                    new KeyValuePair<string, string>("code", code),
                    new KeyValuePair<string, string>("grant_type", google.GrantType),
                    new KeyValuePair<string, string>("redirect_uri", google.RedirectUri)
                })
            );
            if (!response.IsSuccessStatusCode) throw new HttpRequestException("google auth token request: failed");

            GoogleAuthResponse googleAuthResponse;
            try
            {
                googleAuthResponse = await response.Content.ReadFromJsonAsync<GoogleAuthResponse>();
            }
            catch (NotSupportedException) { throw new HttpRequestException("google auth token request: content type is not supported"); }
            catch (JsonException) { throw new HttpRequestException("google auth token request: invalid json"); }
            
            // userinfo
            var parameters = new Dictionary<string, string?>() 
            {
                { "access_token", googleAuthResponse.AccessToken }
            };
            response = await httpClient.GetAsync(
                new Uri(QueryHelpers.AddQueryString(google.APIUri, parameters)).ToString()
            );
			if (!response.IsSuccessStatusCode) throw new HttpRequestException("google userinfo request: failed");

			GoogleUserInfoResponse googleUserInfoResponse;
			try
			{
				googleUserInfoResponse = await response.Content.ReadFromJsonAsync<GoogleUserInfoResponse>();
            }
			catch (NotSupportedException) { throw new HttpRequestException("google userinfo request: content type is not supported"); }
			catch (JsonException) { throw new HttpRequestException("google userinfo request: invalid json"); }

            // creating user's session
            var oauth = await _databaseContext.OAuths
                .Where(o => o.Id == googleUserInfoResponse.Id)
                .Include(o => o.User)
                .FirstOrDefaultAsync();

            var user = oauth?.User;

            var session = new Session
            {
                Guid = Guid.NewGuid()
            };
            
            if (oauth == null)
            {
                oauth = new OAuth
                {
                    Guid = Guid.NewGuid(),
                    Email = googleUserInfoResponse.Email,
                    Id = googleUserInfoResponse.Id,
                    OAuthService = OAuthServiceEnum.Google,
                };

                user = new User
                {
                    Guid = Guid.NewGuid(),
                    Role = RoleEnum.User,
                    UserName = googleUserInfoResponse.Name
                };

                user.OAuths.Add(oauth);
            }

            session.OAuth = oauth;
            session.User = user;

            _databaseContext.Sessions.Add(session);
            await _databaseContext.SaveChangesAsync();

            var accessToken = _jWTService.CreateAccessToken(session.Guid.ToString());

            return (accessToken, _mapper.Map<UserDto>(user));
		}

        public async Task<(string, UserDto)> AuthViaVK(string code)
        {
            var vk = _oauthSettings.VK;
            var httpClient = _httpClientFactory.CreateClient();

            // auth
            var parameters = new Dictionary<string, string?>()
            {
                { "client_id", vk.ClientId },
                { "client_secret", vk.ClientSecret },
                { "redirect_uri", vk.RedirectUri },
                { "code", code }
            };
            var response = await httpClient.GetAsync(
                new Uri(QueryHelpers.AddQueryString(vk.TokenUri, parameters)).ToString()
            );
            if (!response.IsSuccessStatusCode) throw new HttpRequestException("vk auth request: failed");

            VKAuthResponse vkAuthResponse;
            try
            {
                vkAuthResponse = await response.Content.ReadFromJsonAsync<VKAuthResponse>();
            }
            catch (NotSupportedException) { throw new HttpRequestException("vk auth request: content type is not supported"); }
            catch (JsonException) { throw new HttpRequestException("vk auth request: invalid json"); }

            // userinfo
            parameters = new Dictionary<string, string?>()
            {
                { "access_token", vkAuthResponse.AccessToken },
                { "user_ids", vkAuthResponse.UserId.ToString() },
                { "v", vk.APIVersion }
            };
            response = await httpClient.GetAsync(
                new Uri(QueryHelpers.AddQueryString(vk.APIUri, parameters)).ToString()
            );
            if (!response.IsSuccessStatusCode) throw new HttpRequestException("vk userinfo request: failed");

            VKUserInfoResponse vkUserInfoResponse;
            VKUser vkUser;
            try
            {
                vkUserInfoResponse = await response.Content.ReadFromJsonAsync<VKUserInfoResponse>();
                if (vkUserInfoResponse?.Response == null && vkUserInfoResponse.Response.Count > 0)
                {
                    throw new JsonException();
                }
                vkUser = vkUserInfoResponse.Response[0];
            }
            catch (NotSupportedException) { throw new HttpRequestException("vk userinfo request: content type is not supported"); }
            catch (JsonException) { throw new HttpRequestException("vk userinfo request: invalid json"); }

            // creating user's session
            var oauth = await _databaseContext.OAuths
                .Where(o => o.Id == vkUser.Id.ToString())
                .Include(o => o.User)
                .FirstOrDefaultAsync();

            var user = oauth?.User;

            var session = new Session
            {
                Guid = Guid.NewGuid()
            };

            if (oauth == null)
            {
                oauth = new OAuth
                {
                    Guid = Guid.NewGuid(),
                    Id = vkUser.Id.ToString(),
                    OAuthService = OAuthServiceEnum.VK,
                };

                user = new User
                {
                    Guid = Guid.NewGuid(),
                    Role = RoleEnum.User,
                    UserName = $"{vkUser.FirstName} {vkUser.LastName}"
                };

                user.OAuths.Add(oauth);
            }

            session.OAuth = oauth;
            session.User = user;

            _databaseContext.Sessions.Add(session);
            await _databaseContext.SaveChangesAsync();

            var accessToken = _jWTService.CreateAccessToken(session.Guid.ToString());

            return (accessToken, _mapper.Map<UserDto>(user));
        }

        public string GetGoogleAuthUri()
        {
            var google = _oauthSettings.Google;

            var parameters = new Dictionary<string, string?>()
            {
                { "response_type", google.ResponseType },
                { "redirect_uri", google.RedirectUri },
                { "client_id", google.ClientId },
                { "access_type", google.AccessType },
                { "scope", google.Scope },
                { "include_granted_scopes", google.IncludeGrantedScopes }
            };

            return new Uri(QueryHelpers.AddQueryString(google.AuthUri, parameters)).ToString();
        }

        public string GetVKAuthUri()
        {
            var vk = _oauthSettings.VK;

            var parameters = new Dictionary<string, string?>()
            {
                { "client_id", vk.ClientId },
                { "redirect_uri", vk.RedirectUri },
                { "display", vk.Display },
                { "scope", vk.Scope },
                { "response_type", vk.ResponseType }
            };

            return new Uri(QueryHelpers.AddQueryString(vk.AuthUri, parameters)).ToString();
        }
    }
}
