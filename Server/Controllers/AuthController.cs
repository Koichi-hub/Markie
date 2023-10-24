using Microsoft.AspNetCore.Mvc;
using Server.Exceptions;
using Server.Services.Interfaces;

namespace Server.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
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
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Task<IActionResult>))]
        [ProducesResponseType(StatusCodes.Status502BadGateway)]
        public async Task<IActionResult> AuthViaGoogle([FromQuery(Name = "code")] string code)
        {
            try { return Ok(await _authService.AuthViaGoogle(code)); }
            catch (HttpRequestException) { return StatusCode(StatusCodes.Status502BadGateway); }
        }

        [HttpGet("vk")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Task<IActionResult>))]
        [ProducesResponseType(StatusCodes.Status502BadGateway)]
        public async Task<IActionResult> AuthViaVK([FromQuery(Name = "code")] string code)
        {
            try { return Ok(await _authService.AuthViaVK(code)); }
            catch (HttpRequestException) { return StatusCode(StatusCodes.Status502BadGateway); }
        }
    }
}
