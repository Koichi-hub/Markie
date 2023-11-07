using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Server.Configuration;
using Server.Database;
using Server.Extensions;
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
            services.Configure<OAuthSettings>(Configuration.GetSection("OAuthSettings"));
            services.Configure<JWTSettings>(Configuration.GetSection("JWTSettings"));
            services.Configure<AdminSettings>(Configuration.GetSection("AdminSettings"));

            services.AddDbContext<DatabaseContext>(options => options.UseNpgsql(Configuration.GetConnectionString("PostgreSQL")));
            services.AddHttpContextAccessor();
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.WithOrigins(Configuration["AllowedOrigins"].Split(' '))
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials();
                    }
                );
            });
            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddHttpClient();
            services.AddAutoMapper(typeof(MappingProfile));

            services.AddTransient<IJWTService, JWTService>();
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

            app.UseCors();

            app.UseCustomAuthorization();

            app.MapControllers();

            if (!env.IsDevelopment())
            {
                var fileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "front"));
                app.UseFileServer(new FileServerOptions
                {
                    FileProvider = fileProvider
                });

                app.MapFallbackToFile("index.html", new StaticFileOptions
                {
                    FileProvider = fileProvider
                });
            }
        }
    }
}
