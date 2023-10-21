namespace Server.Core.Entities
{
    public class OAuth : BaseEntity
    {
        public Guid UserGuid { get; set; }
        public User User { get; set; } = null!;
        public List<Session> Sessions { get; set; } = new List<Session>();
    }
}
