using Server.Attributes;
using Server.Core.Enums;
using Server.Services.Interfaces;
using System.Security.Principal;

namespace Server.Middlewares
{
    public class CustomAuthorizeMiddleware
    {
        private readonly RequestDelegate _next;

        public CustomAuthorizeMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, IJWTService jWTService)
        {
            try
            {
                var attribute = context?.GetEndpoint()?.Metadata.GetMetadata<CustomAuthorize>();
                if (attribute == null)
                {
                    await _next(context);
                    return;
                }

                if (!context.Request.Headers.ContainsKey("Authorization")) throw new Exception();

                var accessToken = context.Request.Headers["Authorization"][0].Split(" ")[1];
                if (accessToken == null) throw new Exception();

                var (sessionGuid, userGuid) = jWTService.IsValidAccessToken(accessToken);
                if (sessionGuid == null || userGuid == null) throw new Exception();

                var user = new GenericPrincipal(new GenericIdentity(userGuid), new string[] { RoleEnum.User.ToString() });
                context.User = user;

                await _next(context);
            }   
            catch (Exception)
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                return;
            }
        }
    }
}
