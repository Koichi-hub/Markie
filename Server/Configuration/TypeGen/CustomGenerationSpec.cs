using Server.Core.Constants;
using Server.Services.Models;
using TypeGen.Core.SpecGeneration;

namespace Server.Configuration.TypeGen
{
    public class CustomGenerationSpec : GenerationSpec
    {
        public CustomGenerationSpec()
        {
            AddInterface<UserDto>();
            AddInterface<UserAuthorizedDto>();
            AddInterface<NoteDto>();
            AddInterface<TagDto>();
            AddInterface<OAuthDto>();
            AddInterface<SessionDto>();
            AddInterface<CreateNoteDto>();
            AddInterface<ChangeNoteDto>();
            AddInterface<CreateTagDto>();
            AddInterface<ChangeTagDto>();
            AddInterface<ChangeUserDto>();
            AddClass(typeof(Limits));
        }
    }
}
