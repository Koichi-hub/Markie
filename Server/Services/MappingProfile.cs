using AutoMapper;
using Server.Core.Entities;
using Server.Services.Dtos;

namespace Server.Services
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<Note, NoteDto>();
            CreateMap<Tag, TagDto>();
            CreateMap<Session, SessionDto>();
            CreateMap<OAuth, OAuthDto>();
        }
    }
}
