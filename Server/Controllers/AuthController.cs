using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Options;
using Server.Configuration;
using Server.Controllers.Models;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Server.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly OAuthSettings _oauthSettings;

        public AuthController(IOptions<OAuthSettings> oauthSettingsAccessor, IHttpClientFactory httpClientFactory)
        {
            _oauthSettings = oauthSettingsAccessor.Value;
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet("uri/google")]
        public string GetGoogleAuthUri()
        {
            var google = _oauthSettings.Google;

            var parameters = new Dictionary<string, string?>()
            {
                { "response_type", google.ResponseType },
                { "redirect_uri", _oauthSettings.RedirectUri },
                { "client_id", google.ClientId },
                { "access_type", google.AccessType },
                { "scope", google.Scope },
                { "include_granted_scopes", google.IncludeGrantedScopes }
            };

            return new Uri(QueryHelpers.AddQueryString(google.AuthUri, parameters)).ToString();
        }

        [HttpGet("uri/vk")]
        public string GetVKAuthUri()
        {
            var vk = _oauthSettings.VK;

            var parameters = new Dictionary<string, string?>()
            {
                { "client_id", vk.ClientId },
                { "redirect_uri", _oauthSettings.RedirectUri },
                { "display", vk.Display },
                { "scope", vk.Scope },
                { "response_type", vk.ResponseType }
            };

            return new Uri(QueryHelpers.AddQueryString(vk.AuthUri, parameters)).ToString();
        }

        [HttpGet("google")]
        public async Task<string?> AuthInGoogle([FromQuery(Name = "code")] string code)
        {
            var google = _oauthSettings.Google;

            var httpClient = _httpClientFactory.CreateClient();
            var response = await httpClient.PostAsync(
                google.TokenUri,
                new FormUrlEncodedContent(new List<KeyValuePair<string, string>>
                {
                    new KeyValuePair<string, string>("client_id", google.ClientId),
                    new KeyValuePair<string, string>("client_secret", google.ClientSecret),
                    new KeyValuePair<string, string>("code", code),
                    new KeyValuePair<string, string>("grant_type", google.GrantType),
                    new KeyValuePair<string, string>("redirect_uri", _oauthSettings.RedirectUri)
                })
            );

            response.EnsureSuccessStatusCode(); // throws if not 200-299

            if (response.Content is object && response.Content.Headers.ContentType.MediaType == "application/json")
            {
                var contentStream = await response.Content.ReadAsStreamAsync();

                try
                {
                    var googleAuthResponse = await JsonSerializer.DeserializeAsync<GoogleAuthResponse>(
                        contentStream, 
                        new JsonSerializerOptions {
                            DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull, 
                            PropertyNameCaseInsensitive = true 
                        }
                    );
                    return googleAuthResponse?.AccessToken;
                }
                catch (JsonException) // Invalid JSON
                {
                    return "Invalid JSON";
                }
            }
            else
            {
                return "HTTP Response was invalid and cannot be deserialised";
            }
        }

        [HttpGet("sign-up")]
        public void SignUpUser()
        {

        }
    }
}
