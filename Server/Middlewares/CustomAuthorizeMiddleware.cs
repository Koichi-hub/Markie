using Microsoft.EntityFrameworkCore;
using Server.Attributes;
using Server.Core.Enums;
using Server.Database;
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

        public async Task InvokeAsync(HttpContext context, IJWTService jWTService, DatabaseContext databaseContext)
        {
            try
            {
                var attribute = context?.GetEndpoint()?.Metadata.GetMetadata<CustomAuthorize>();
                if (attribute == null)
                {
                    await _next(context);
                    return;
                }

                var accessToken = context.Request.Cookies["access_token"];
                if (accessToken == null) throw new Exception();

                var sessionGuid = jWTService.IsValidAccessToken(accessToken);
                if (sessionGuid == null) throw new Exception();

                var session = await databaseContext.Sessions
                    .FirstOrDefaultAsync(s => s.Guid == Guid.Parse(sessionGuid));
                if (session == null) throw new Exception();

                var isUserExists = await databaseContext.Users.AnyAsync(u => u.Guid == session.UserGuid);
                if (!isUserExists) throw new Exception();

                var user = new GenericPrincipal(new GenericIdentity(session.UserGuid.ToString()), new string[] { RoleEnum.User.ToString() });
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
