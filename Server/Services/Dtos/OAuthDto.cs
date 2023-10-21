namespace Server.Services.Dtos
{
    public class OAuthDto
    {
        public Guid Guid { get; set; }
        public Guid UserGuid { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
