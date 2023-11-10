using Server.Core.Constants;
using System.ComponentModel.DataAnnotations;

namespace Server.Services.Models
{
    public class ChangeTagDto
    {
        [Required]
        [MaxLength(Limits.TAG_NAME_MAXLENGTH)]
        public string Name { get; set; } = null!;
    }
}
