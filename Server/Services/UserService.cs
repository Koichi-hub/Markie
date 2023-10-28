using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Server.Database;
using Server.Services.Interfaces;
using Server.Services.Models;

namespace Server.Services
{
    public class UserService : IUserService
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IMapper _mapper;

        public UserService(DatabaseContext databaseContext, IMapper mapper)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
        }

        public async Task<UserDto?> GetUserByGuid(Guid userGuid)
        {
            var user = await _databaseContext.Users.FirstOrDefaultAsync(u => u.Guid == userGuid);
            if (user == null) return null;

            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto?> ChangeUser(Guid userGuid, ChangeUserDto changeUserDto)
        {
            var user = await _databaseContext.Users.FirstOrDefaultAsync(u => u.Guid == userGuid);
            if (user == null) return null;

            user.UserName = changeUserDto.UserName;

            _databaseContext.Update(user);
            await _databaseContext.SaveChangesAsync();

            return _mapper.Map<UserDto>(user);
        }
    }
}
