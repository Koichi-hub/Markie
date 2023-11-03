using Server.Services.Models;

namespace Server.Services.Interfaces
{
    public interface IAuthService
    {
        public string GetGoogleAuthUri();
        public string GetVKAuthUri();
        public Task<(UserAuthorizedDto, string)> AuthViaGoogle(string code);
        public Task<(UserAuthorizedDto, string)> AuthViaVK(string code);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="refreshToken"></param>
        /// <returns>(string, string) (accessToken, refreshToken)</returns>
        public Task<(string, string)> RefreshTokens(string refreshToken);
    }
}
