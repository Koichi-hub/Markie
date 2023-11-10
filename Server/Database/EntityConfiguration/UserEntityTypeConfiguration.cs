using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Core.Constants;
using Server.Core.Entities;
using Server.Core.Enums;

namespace Server.Database.EntityConfiguration
{
    public class UserEntityTypeConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(u => u.Guid);
            builder
                .Property(r => r.Role)
                .HasConversion(
                    v => Convert.ToInt32(v),
                    v => (RoleEnum)Enum.ToObject(typeof(RoleEnum), v)
                );
            builder
                .Property(n => n.UserName)
                .HasMaxLength(Limits.USER_NAME_MAXLENGTH);
            builder
                .Property(n => n.Login)
                .HasMaxLength(Limits.USER_LOGIN_MAXLENGTH);
            builder
                .Property(n => n.Password)
                .HasMaxLength(Limits.USER_PASSWORD_MAXLENGTH);
        }
    }
}
