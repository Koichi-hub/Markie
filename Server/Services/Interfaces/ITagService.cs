using Server.Services.Models;

namespace Server.Services.Interfaces
{
    public interface ITagService
    {
        public Task<IList<TagDto>?> GetTags(Guid userGuid);
        public Task<TagDto?> CreateTag(Guid userGuid, CreateTagDto createTagDto);
        public Task<TagDto?> ChangeTag(Guid userGuid, Guid tagGuid, ChangeTagDto changeTagDto);
        public Task<TagDto?> DeleteTag(Guid userGuid, Guid tagGuid);
    }
}
