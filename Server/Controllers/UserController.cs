using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Database;
using Server.Services.Dtos;

namespace Server.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public DatabaseContext DatabaseContext { get; set; }
        public IMapper Mapper { get; set; }

        public UserController(DatabaseContext databaseContext, IMapper mapper)
        {
            DatabaseContext = databaseContext;
            Mapper = mapper;
        }

        [HttpGet]
        public async Task<List<UserDto>> GetUsers()
        {
            var user = await DatabaseContext.Users.ToListAsync();
            return Mapper.Map<List<UserDto>>(user);
        }
    }
}
