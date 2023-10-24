namespace Server.Services.Models
{
    public class OAuthDto
    {
        public Guid Guid { get; set; }
        public Guid UserGuid { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
