﻿using Microsoft.AspNetCore.Mvc;
using Server.Services.Interfaces;

namespace Server.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthController(IAuthService authService, IHttpContextAccessor httpContextAccessor)
        {
            _authService = authService;
            _httpContextAccessor = httpContextAccessor;
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
                var userAuthorizedDto = await _authService.AuthViaGoogle(code);
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
                var userAuthorizedDto = await _authService.AuthViaVK(code);
                return Ok(userAuthorizedDto);
            }
            catch (HttpRequestException) { return StatusCode(StatusCodes.Status502BadGateway); }
        }
    }
}
