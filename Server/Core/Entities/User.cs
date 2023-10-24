using Server.Core.Enums;

namespace Server.Core.Entities
{
    public class User : BaseEntity
    {
        public string UserName { get; set; } = null!;
        public string? Login { get; set; }
        public string? Password { get; set; }
        public RoleEnum Role { get; set; }
        public List<OAuth> OAuths { get; set; } = new List<OAuth>();
        public List<Session> Sessions { get; set; } = new List<Session>();
        public List<Tag> Tags { get; set; } = new List<Tag>();
        public List<Note> Notes { get; set; } = new List<Note>();
    }
}
