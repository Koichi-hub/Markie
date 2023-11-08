using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Server.Configuration;
using Server.Core.Entities;
using Server.Core.Enums;
using Server.Database.EntityConfiguration;

namespace Server.Database
{
    public class DatabaseContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<OAuth> OAuths { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<TagNote> TagNotes { get; set; }
        public DbSet<Session> Sessions { get; set; }

        private readonly AdminSettings _adminSettings;

        public DatabaseContext(
            DbContextOptions<DatabaseContext> options,
            IOptions<AdminSettings> adminSettings
        ) : base(options) 
        {
            _adminSettings = adminSettings.Value;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            new UserEntityTypeConfiguration().Configure(modelBuilder.Entity<User>());
            new NoteEntityTypeConfiguration().Configure(modelBuilder.Entity<Note>());
            new TagEntityTypeConfiguration().Configure(modelBuilder.Entity<Tag>());
            new OAuthEntityTypeConfiguration().Configure(modelBuilder.Entity<OAuth>());
            new SessionEntityTypeConfiguration().Configure(modelBuilder.Entity<Session>());

            modelBuilder.Entity<User>().HasData(new User
            {
                Guid = Guid.NewGuid(),
                Role = RoleEnum.Admin,
                Login = _adminSettings.Login,
                Password = _adminSettings.Password,
                UserName = _adminSettings.UserName,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
            });
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var entries = ChangeTracker
                .Entries()
                .Where(e => e.Entity is BaseEntity && (
                    e.State == EntityState.Added ||
                    e.State == EntityState.Modified
                ));

            foreach (var entityEntry in entries)
            {
                ((BaseEntity)entityEntry.Entity).UpdatedAt = DateTime.UtcNow;

                if (entityEntry.State == EntityState.Added)
                {
                    ((BaseEntity)entityEntry.Entity).CreatedAt = DateTime.UtcNow;
                }
            }

            return base.SaveChangesAsync(cancellationToken);
        }
    }
}
