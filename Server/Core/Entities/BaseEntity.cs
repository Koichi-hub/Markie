namespace Server.Core.Entities
{
    public abstract class BaseEntity
    {
        public Guid Guid { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
