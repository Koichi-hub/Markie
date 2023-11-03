namespace Server.Configuration
{
    public class JWTSettings
    {
        public string Issuer { get; set; } = null!;
        public string Audience { get; set; } = null!;
        public string SigningKey { get; set; } = null!;
        public int AccessTokenExpirationHours {  get; set; }
        public int RefreshTokenExpirationDays { get; set; }
    }
}
