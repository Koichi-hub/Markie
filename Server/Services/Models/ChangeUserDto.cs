using Server.Core.Constants;
using System.ComponentModel.DataAnnotations;

namespace Server.Services.Models
{
    public class ChangeUserDto
    {
        [Required]
        [MaxLength(Limits.USER_NAME_MAXLENGTH)]
        public string UserName { get; set; } = null!;
    }
}
