using Server.Core.Constants;
using System.ComponentModel.DataAnnotations;

namespace Server.Services.Models
{
    public class ChangeNoteDto
    {
        [Required]
        [MaxLength(Limits.NOTE_NAME_MAXLENGTH)]
        public string Name { get; set; } = null!;

        [Required(AllowEmptyStrings = true)]
        [MaxLength(Limits.NOTE_CONTENT_MAXLENGTH)]
        public string Content { get; set; } = null!;

        [Required]
        public List<Guid> TagsGuids { get; set; } = new List<Guid>();
    }
}
