using Server.Middlewares;

namespace Server.Extensions
{
    public static class CustomAuthorizeMiddlewareExtension
    {
        public static IApplicationBuilder UseCustomAuthorization(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<CustomAuthorizeMiddleware>();
        }
    }
}
