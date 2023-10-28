using System.ComponentModel.DataAnnotations;

namespace Server.Services.Models
{
    public class CreateNoteDto
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = null!;
        [Required]
        public string Content { get; set; } = null!;
    }
}
