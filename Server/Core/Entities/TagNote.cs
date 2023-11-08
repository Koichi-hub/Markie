namespace Server.Core.Entities
{
    public class TagNote
    {
        public Guid TagGuid { get; set; }
        public Tag Tag { get; set; } = null!;
        public Guid NoteGuid { get; set; }
        public Note Note { get; set; } = null!;
    }
}
