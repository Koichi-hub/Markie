namespace Server.Services.Interfaces
{
    public interface IJWTService
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="sessionGuid"></param>
        /// <returns>string accessToken</returns>
        public string CreateAccessToken(string sessionGuid);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="accessToken"></param>
        /// <returns>string? sessionGuid</returns>
        public string? IsValidAccessToken(string accessToken);
    }
}
