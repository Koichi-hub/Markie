namespace Server.Services.Interfaces
{
    public interface IJWTService
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="sessionGuid"></param>
        /// <param name="userGuid"></param>
        /// <param name="isAccessToken"></param>
        /// <returns>string accessToken</returns>
        public string CreateToken(string sessionGuid, string userGuid, bool isAccessToken);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="accessToken"></param>
        /// <returns>(string?, string?) (sessionGuid, userGuid)</returns>
        public (string?, string?) IsValidAccessToken(string accessToken);
    }
}
