using Microsoft.EntityFrameworkCore;
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
        public DbSet<Session> Sessions { get; set; }

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

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
                Login = "admin",
                Password = "password",
                UserName = "Admin",
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
                ((BaseEntity)entityEntry.Entity).UpdatedAt = DateTime.Now;

                if (entityEntry.State == EntityState.Added)
                {
                    ((BaseEntity)entityEntry.Entity).CreatedAt = DateTime.Now;
                }
            }

            return base.SaveChangesAsync(cancellationToken);
        }
    }
}
