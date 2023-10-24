using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Core.Entities;
using Server.Core.Enums;

namespace Server.Database.EntityConfiguration
{
    public class OAuthEntityTypeConfiguration : IEntityTypeConfiguration<OAuth>
    {
        public void Configure(EntityTypeBuilder<OAuth> builder)
        {
            builder.HasKey(o => o.Guid);
            builder
                .Property(o => o.OAuthService)
                .HasConversion(
                    v => Convert.ToInt32(v),
                    v => (OAuthServiceEnum)Enum.ToObject(typeof(OAuthServiceEnum), v)
                );
            builder
                .HasIndex(o => o.Email)
                .IsUnique();
            builder
                .HasIndex(o => o.Id)
                .IsUnique();
        }
    }
}
