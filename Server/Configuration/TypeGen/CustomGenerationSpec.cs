using Server.Services.Models;
using TypeGen.Core.SpecGeneration;

namespace Server.Configuration.TypeGen
{
    public class CustomGenerationSpec : GenerationSpec
    {
        public CustomGenerationSpec()
        {
            AddInterface<UserDto>();
            AddInterface<NoteDto>();
            AddInterface<TagDto>();
            AddInterface<OAuthDto>();
            AddInterface<SessionDto>();
        }
    }
}
