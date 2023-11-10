using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Core.Constants;
using Server.Core.Entities;

namespace Server.Database.EntityConfiguration
{
    public class TagEntityTypeConfiguration : IEntityTypeConfiguration<Tag>
    {
        public void Configure(EntityTypeBuilder<Tag> builder)
        {
            builder.HasKey(t => t.Guid);
            builder
                .HasMany(t => t.Notes)
                .WithMany(n => n.Tags)
                .UsingEntity<TagNote>();
            builder
                .Property(t => t.Name)
                .HasMaxLength(Limits.TAG_NAME_MAXLENGTH);
        }
    }
}
