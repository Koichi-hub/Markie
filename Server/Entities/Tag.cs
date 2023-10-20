namespace Server.Entities
{
    public class Tag
    {
        public Guid Guid { get; set; }
        public string Name { get; set; } = null!;
        public Guid UserGuid { get; set; }
        public User User { get; set; } = null!;
        public List<Note> Notes { get; } = new List<Note>();
    }
}
