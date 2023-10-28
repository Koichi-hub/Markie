using System.ComponentModel.DataAnnotations;

namespace Server.Services.Models
{
    public class ChangeTagDto
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = null!;
    }
}
