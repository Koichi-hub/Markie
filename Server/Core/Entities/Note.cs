namespace Server.Core.Entities
{
    public class Note : BaseEntity
    {
        public string Name { get; set; } = null!;
        public string Content { get; set; } = null!;
        public Guid UserGuid { get; set; }
        public User User { get; set; } = null!;
        public List<Tag> Tags { get; set; } = new List<Tag>();
    }
}
