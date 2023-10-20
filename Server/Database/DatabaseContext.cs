using Microsoft.EntityFrameworkCore;
using Server.Database.EntityConfiguration;
using Server.Entities;

namespace Server.Database
{
    public class DatabaseContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<OAuth> OAuths { get; set; }
        public DbSet<Role> Roles { get; set; }
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
            new RoleEntityTypeConfiguration().Configure(modelBuilder.Entity<Role>());

            var userRole = new Role { Id = 1, Name = "User" };
            var adminRole = new Role { Id = 1000, Name = "Admin" };

            modelBuilder.Entity<Role>().HasData(userRole, adminRole);

            var adminGuid = Guid.NewGuid();
            var admin = new User
            {
                Guid = adminGuid,
                Login = "admin",
                Password = "password",
                UserName = "Admin",
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
            };
            modelBuilder.Entity<User>().HasData(admin);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Roles)
                .WithMany(r => r.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "UserRole",
                    ur => ur.HasOne<Role>().WithMany().HasForeignKey("RoleId"),
                    ur => ur.HasOne<User>().WithMany().HasForeignKey("UserGuid"),
                    ur =>
                    {
                        ur.HasKey("UserGuid", "RoleId");
                        ur.HasData(
                            new { UserGuid = adminGuid, RoleId = 1000 }
                        );
                    }
                );
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
