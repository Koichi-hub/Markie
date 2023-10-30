namespace Server.Services.Models
{
    public class NoteDto
    {
        public Guid Guid { get; set; }
        public string Name { get; set; } = null!;
        public string Content { get; set; } = null!;
        public Guid UserGuid { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public IList<TagDto> Tags { get; set; } = new List<TagDto>();
    }
}
