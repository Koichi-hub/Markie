namespace Server.Core.Entities
{
    public class Session : BaseEntity
    {
        public Guid UserGuid { get; set; }
        public User User { get; set; } = null!;
        public Guid OAuthGuid { get; set; }
        public OAuth OAuth { get; set; } = null!;
    }
}
