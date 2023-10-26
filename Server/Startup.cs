using Microsoft.EntityFrameworkCore;
using Server.Configuration;
using Server.Database;
using Server.Services;
using Server.Services.Interfaces;

namespace Server
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            var oauthSettingsSection = Configuration.GetSection("OAuthSettings");
            services.Configure<OAuthSettings>(oauthSettingsSection);

            services.AddDbContext<DatabaseContext>(options => options.UseNpgsql(Configuration.GetConnectionString("PostgreSQL")));
            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddHttpClient();
            services.AddAutoMapper(typeof(MappingProfile));
            services.AddCors();

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<INoteService, NoteService>();
            services.AddScoped<ITagService, TagService>();
            services.AddScoped<ISessionService, SessionService>();
            services.AddScoped<IOAuthService, OAuthService>();
            services.AddScoped<IAuthService, AuthService>();
        }

        public void Configure(WebApplication app, IWebHostEnvironment env)
        {
            using (var scope = app.Services.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<DatabaseContext>();
                context.Database.EnsureCreated();
            }

            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors(builder => builder.AllowAnyOrigin());

            app.UseAuthorization();

            app.MapControllers();
        }
    }
}
