using Server.Core.Constants;
using System.ComponentModel.DataAnnotations;

namespace Server.Services.Models
{
    public class CreateNoteDto
    {
        [Required]
        [MaxLength(Limits.NOTE_NAME_MAXLENGTH)]
        public string Name { get; set; } = null!;

        [MaxLength(Limits.NOTE_CONTENT_MAXLENGTH)]
        public string Content { get; set; } = null!;

        public List<Guid> TagsGuids { get; set; } = new List<Guid>();
    }
}
