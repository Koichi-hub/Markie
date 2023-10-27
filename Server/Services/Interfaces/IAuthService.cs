using Server.Services.Models;

namespace Server.Services.Interfaces
{
    public interface IAuthService
    {
        public string GetGoogleAuthUri();
        public string GetVKAuthUri();
        public Task<(string, UserDto)> AuthViaGoogle(string code);
        public Task<(string, UserDto)> AuthViaVK(string code);
    }
}
