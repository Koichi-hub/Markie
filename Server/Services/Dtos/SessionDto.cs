namespace Server.Services.Dtos
{
    public class SessionDto
    {
        public Guid Guid { get; set; }
        public Guid UserGuid { get; set; }
        public Guid OAuthGuid { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
