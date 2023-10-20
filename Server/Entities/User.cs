namespace Server.Entities
{
    public class User : BaseEntity
    {
        public string UserName { get; set; } = null!;
        public string Login { get; set; } = null!;
        public string Password { get; set; } = null!;
        public List<OAuth> OAuths { get; set; } = new List<OAuth>();
        public List<Session> Sessions { get; set; } = new List<Session>();
        public List<Role> Roles { get; set; } = new List<Role>();
        public List<Tag> Tags { get; set; } = new List<Tag>();
        public List<Note> Notes { get; set; } = new List<Note>();
    }
}
