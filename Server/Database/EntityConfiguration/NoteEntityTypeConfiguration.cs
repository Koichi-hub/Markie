using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Core.Constants;
using Server.Core.Entities;

namespace Server.Database.EntityConfiguration
{
    public class NoteEntityTypeConfiguration : IEntityTypeConfiguration<Note>
    {
        public void Configure(EntityTypeBuilder<Note> builder)
        {
            builder.HasKey(n => n.Guid);
            builder
                .Property(n => n.Name)
                .HasMaxLength(Limits.NOTE_NAME_MAXLENGTH);
            builder
                .Property(n => n.Content)
                .HasMaxLength(Limits.NOTE_CONTENT_MAXLENGTH);
        }
    }
}
