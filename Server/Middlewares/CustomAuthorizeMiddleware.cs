using Server.Attributes;

namespace Server.Middlewares
{
    public class CustomAuthorizeMiddleware
    {
        private readonly RequestDelegate _next;

        public CustomAuthorizeMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var attribute = context?.GetEndpoint()?.Metadata.GetMetadata<CustomAuthorize>();

            if (attribute == null) await _next(context);
        }
    }
}
