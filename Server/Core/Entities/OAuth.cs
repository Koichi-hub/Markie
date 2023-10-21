using Server.Core.Enums;

namespace Server.Core.Entities
{
    public class OAuth : BaseEntity
    {
        public Guid UserGuid { get; set; }
        public User User { get; set; } = null!;
        public OAuthServiceEnum OAuthService { get; set; }
        public string Id { get; set; } = null!;
        public string? Email { get; set; }
        public List<Session> Sessions { get; set; } = new List<Session>();
    }
}
