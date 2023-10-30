using AutoMapper;
using Server.Core.Entities;
using Server.Services.Models;

namespace Server.Services
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<Note, NoteDto>();
            CreateMap<Tag, TagDto>()
                .ForMember(dest => dest.NotesCount, opt => opt.MapFrom(src => src.Notes.Count));
            CreateMap<Session, SessionDto>();
            CreateMap<OAuth, OAuthDto>();
        }
    }
}
