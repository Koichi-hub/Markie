using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Server.Core.Entities;
using Server.Database;
using Server.Services.Interfaces;
using Server.Services.Models;

namespace Server.Services
{
    public class NoteService : INoteService
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IMapper _mapper;

        public NoteService(DatabaseContext databaseContext, IMapper mapper)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
        }

        public async Task<IList<NoteDto>?> GetNotesByTag(Guid userGuid, Guid tagGuid)
        {
            var tagExists = await _databaseContext.Tags
                .AnyAsync(t => t.UserGuid == userGuid && t.Guid == tagGuid);
            if (!tagExists) return null;

            var notes = await _databaseContext.TagNotes
                .Where(tn => tn.TagGuid == tagGuid)
                .Include(tn => tn.Note)
                .ThenInclude(n => n.Tags)
                .Select(tn => new Note
                {
                    Guid = tn.Note.Guid,
                    UserGuid = tn.Note.UserGuid,
                    Name = tn.Note.Name,
                    CreatedAt = tn.Note.CreatedAt,
                    UpdatedAt = tn.Note.UpdatedAt,
                    Tags = tn.Note.Tags
                })
                .OrderByDescending(n => n.UpdatedAt)
                .AsSplitQuery()
                .ToListAsync();

            return _mapper.Map<List<NoteDto>>(notes);
        }

        public async Task<IList<NoteDto>?> GetNotes(Guid userGuid)
        {
            var notes = await _databaseContext.Notes
                .Where(n => n.UserGuid == userGuid)
                .Include(n => n.Tags)
                .Select(n => new Note
                {
                    Guid = n.Guid,
                    UserGuid = n.UserGuid,
                    Name = n.Name,
                    CreatedAt = n.CreatedAt,
                    UpdatedAt = n.UpdatedAt,
                    Tags = n.Tags
                })
                .OrderByDescending(n => n.UpdatedAt)
                .AsSplitQuery()
                .ToListAsync();

            return _mapper.Map<List<NoteDto>>(notes);
        }

        public async Task<int> GetNotesCount(Guid userGuid)
        {
            var notesCount = await _databaseContext.Notes.CountAsync(n => n.UserGuid == userGuid);
            return notesCount;
        }

        public async Task<NoteDto?> GetNote(Guid userGuid, Guid noteGuid)
        {
            var note = await _databaseContext.Notes
                .Include(n => n.Tags)
                .AsSplitQuery()
                .FirstOrDefaultAsync(n => n.UserGuid == userGuid && n.Guid == noteGuid);
            if (note == null) return null;

            return _mapper.Map<NoteDto>(note);
        }

        public async Task<NoteDto?> CreateNote(Guid userGuid, CreateNoteDto createNoteDto)
        {
            var note = new Note
            {
                Guid = Guid.NewGuid(),
                Name = createNoteDto.Name,
                Content = createNoteDto.Content,
                UserGuid = userGuid
            };

            if (createNoteDto.TagsGuids.Count > 0)
            {
                var tags = await _databaseContext.Tags
                    .Where(t => t.UserGuid == userGuid && createNoteDto.TagsGuids.Contains(t.Guid)).ToListAsync();
                note.Tags.AddRange(tags);
            }

            _databaseContext.Notes.Add(note);
            await _databaseContext.SaveChangesAsync();

            return _mapper.Map<NoteDto>(note);
        }

        public async Task<NoteDto?> ChangeNote(Guid userGuid, Guid noteGuid, ChangeNoteDto changeNoteDto)
        {
            var note = await _databaseContext.Notes
                .Include(n => n.Tags)
                .AsSplitQuery()
                .FirstOrDefaultAsync(n => n.UserGuid == userGuid && n.Guid == noteGuid);
            if (note == null) return null;

            note.Name = changeNoteDto.Name;
            note.Content = changeNoteDto.Content;

            var tags = await _databaseContext.Tags.Where(t => t.UserGuid == userGuid && changeNoteDto.TagsGuids.Contains(t.Guid)).ToListAsync();
            var removeTagsList = note.Tags.Except(tags).ToList();
            var addTagsList = tags.Except(note.Tags).ToList();
            foreach (var t in addTagsList)
                note.Tags.Add(t);
            foreach (var t in removeTagsList)
                note.Tags.Remove(t);

            await _databaseContext.SaveChangesAsync();

            return _mapper.Map<NoteDto>(note);
        }

        public async Task<NoteDto?> DeleteNote(Guid userGuid, Guid noteGuid)
        {
            var note = await _databaseContext.Notes.FirstOrDefaultAsync(n => n.UserGuid == userGuid && n.Guid == noteGuid);
            if (note == null) return null;

            _databaseContext.Notes.Remove(note);
            await _databaseContext.SaveChangesAsync();

            return _mapper.Map<NoteDto>(note);
        }
    }
}
