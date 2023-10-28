using Server.Services.Models;

namespace Server.Services.Interfaces
{
    public interface IUserService
    {
        public Task<UserDto?> GetUserByGuid(Guid userGuid);
        public Task<UserDto?> ChangeUser(Guid userGuid, ChangeUserDto changeUserDto);
    }
}
