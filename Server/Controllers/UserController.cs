using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Core.Entities;
using Server.Database;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public DatabaseContext DatabaseContext { get; set; }

        public UserController(DatabaseContext databaseContext)
        {
            DatabaseContext = databaseContext;
        }

        [HttpGet]
        public async Task<List<User>> GetUsers()
        {
            return await DatabaseContext.Users.ToListAsync();
        }
    }
}
