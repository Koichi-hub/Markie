using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Core.Entities;

namespace Server.Database.EntityConfiguration
{
    public class OAuthEntityTypeConfiguration : IEntityTypeConfiguration<OAuth>
    {
        public void Configure(EntityTypeBuilder<OAuth> builder)
        {
            builder.HasKey(o => o.Guid);
        }
    }
}
