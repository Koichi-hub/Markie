using Server.Services.Models;

namespace Server.Services.Interfaces
{
    public interface IAuthService
    {
        public string GetGoogleAuthUri();
        public string GetVKAuthUri();
        public Task<UserAuthorizedDto> AuthViaGoogle(string code);
        public Task<UserAuthorizedDto> AuthViaVK(string code);
    }
}
