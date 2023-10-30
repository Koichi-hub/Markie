using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Server.Core.Entities;
using Server.Database;
using Server.Services.Interfaces;
using Server.Services.Models;

namespace Server.Services
{
    public class TagService : ITagService
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IMapper _mapper;

        public TagService(DatabaseContext databaseContext, IMapper mapper)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
        }

        public async Task<IList<TagDto>?> GetTags(Guid userGuid)
        {
            var tags = await _databaseContext.Tags.Where(t => t.UserGuid == userGuid).ToListAsync();
            return _mapper.Map<List<TagDto>>(tags);
        }

        public async Task<TagDto?> CreateTag(Guid userGuid, CreateTagDto createTagDto)
        {
            var tag = new Tag
            {
                Guid = Guid.NewGuid(),
                Name = createTagDto.Name,
                UserGuid = userGuid
            };

            _databaseContext.Tags.Add(tag);
            await _databaseContext.SaveChangesAsync();

            return _mapper.Map<TagDto>(tag);
        }

        public async Task<TagDto?> ChangeTag(Guid userGuid, Guid tagGuid, ChangeTagDto changeTagDto)
        {
            var tag = await _databaseContext.Tags.FirstOrDefaultAsync(t => t.UserGuid == userGuid && t.Guid == tagGuid);
            if (tag == null) return null;

            tag.Name = changeTagDto.Name;

            _databaseContext.Update(tag);
            await _databaseContext.SaveChangesAsync();

            return _mapper.Map<TagDto>(tag);
        }

        public async Task<TagDto?> DeleteTag(Guid userGuid, Guid tagGuid)
        {
            var tag = await _databaseContext.Tags.FirstOrDefaultAsync(t => t.UserGuid == userGuid && t.Guid == tagGuid);
            if (tag == null) return null;

            _databaseContext.Remove(tag);
            await _databaseContext.SaveChangesAsync();

            return _mapper.Map<TagDto>(tag);
        }

        public async Task<IList<TagDto>?> DeleteTags(Guid userGuid, IList<Guid> tagsGuids)
        {
            if (tagsGuids.Count == 0) return null;

            var tags = await _databaseContext.Tags.Where(t => tagsGuids.Contains(t.Guid)).ToListAsync();

            _databaseContext.RemoveRange(tags);
            await _databaseContext.SaveChangesAsync();

            return _mapper.Map<List<TagDto>>(tags);
        }
    }
}
