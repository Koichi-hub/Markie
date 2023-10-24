using Server.Core.Enums;

namespace Server.Services.Models
{
    public class UserDto
    {
        public Guid Guid { get; set; }
        public string UserName { get; set; } = null!;
        public RoleEnum Role { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
