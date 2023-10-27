using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Attributes;
using Server.Database;
using Server.Services.Models;

namespace Server.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public DatabaseContext DatabaseContext { get; set; }
        public IMapper Mapper { get; set; }

        public UserController(DatabaseContext databaseContext, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            DatabaseContext = databaseContext;
            Mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }

        [CustomAuthorize]
        [HttpGet]
        public async Task<UserDto?> GetUsers()
        {
            var guid = _httpContextAccessor?.HttpContext?.User?.Identity?.Name;

            if (guid == null) return null;

            var user = await DatabaseContext.Users.FirstOrDefaultAsync(u => u.Guid == Guid.Parse(guid));
            return Mapper.Map<UserDto>(user);
        }
    }
}
