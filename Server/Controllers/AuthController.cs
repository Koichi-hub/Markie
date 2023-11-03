using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Server.Configuration;
using Server.Services.Interfaces;
using Server.Services.Models;

namespace Server.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly JWTSettings _jWTSettings;

        public AuthController(IAuthService authService, IHttpContextAccessor httpContextAccessor, IOptions<JWTSettings> jWTSettings)
        {
            _authService = authService;
            _httpContextAccessor = httpContextAccessor;
            _jWTSettings = jWTSettings.Value;
        }

        [HttpGet("uri/google")]
        public string GetGoogleAuthUri()
        {
            return _authService.GetGoogleAuthUri();
        }

        [HttpGet("uri/vk")]
        public string GetVKAuthUri()
        {
            return _authService.GetVKAuthUri();
        }

        [HttpGet("google")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status502BadGateway)]
        public async Task<IActionResult> AuthViaGoogle([FromQuery(Name = "code")] string code)
        {
            try
            {
                var (userAuthorizedDto, refreshToken) = await _authService.AuthViaGoogle(code);
                SetRefreshTokenCookie(refreshToken);
                return Ok(userAuthorizedDto);
            }
            catch (HttpRequestException) { return StatusCode(StatusCodes.Status502BadGateway); }
        }

        [HttpGet("vk")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status502BadGateway)]
        public async Task<IActionResult> AuthViaVK([FromQuery(Name = "code")] string code)
        {
            try 
            {
                var (userAuthorizedDto, refreshToken) = await _authService.AuthViaVK(code);
                SetRefreshTokenCookie(refreshToken);
                return Ok(userAuthorizedDto);
            }
            catch (HttpRequestException) { return StatusCode(StatusCodes.Status502BadGateway); }
        }

        [HttpGet("refresh")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> RefreshTokens()
        {
            try
            {
                var request = _httpContextAccessor.HttpContext.Request;
                if (!request.Cookies.ContainsKey("refresh_token")) throw new Exception();

                var refreshToken = request.Cookies["refresh_token"];
                if (refreshToken.IsNullOrEmpty()) throw new Exception();

                var (accessToken, newRefreshToken) = await _authService.RefreshTokens(refreshToken);

                SetRefreshTokenCookie(newRefreshToken);
                return Ok(accessToken);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status401Unauthorized);
            }
        }

        private void SetRefreshTokenCookie(string refreshToken)
        {
            var cookieOptions = new CookieOptions()
            {
                MaxAge = TimeSpan.FromDays(_jWTSettings.RefreshTokenExpirationDays),
                Secure = false,
                HttpOnly = true,
                Path = "/api/auth"
            };

            _httpContextAccessor.HttpContext.Response.Cookies.Append("refresh_token", refreshToken, cookieOptions);
        }
    }
}
