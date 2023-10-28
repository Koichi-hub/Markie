using System.ComponentModel.DataAnnotations;

namespace Server.Services.Models
{
    public class ChangeUserDto
    {
        [Required]
        [StringLength(100)]
        public string UserName { get; set; } = null!;
    }
}
