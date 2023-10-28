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
            var tag = await _databaseContext.Tags
                .Include(t => t.Notes)
                .FirstOrDefaultAsync(t => t.UserGuid == userGuid && t.Guid == tagGuid);
            if (tag == null) return null;

            return _mapper.Map<List<NoteDto>>(tag.Notes);
        }

        public async Task<IList<NoteDto>?> GetNotes(Guid userGuid)
        {
            var notes = await _databaseContext.Notes.Where(n => n.UserGuid == userGuid).ToListAsync();
            return _mapper.Map<List<NoteDto>>(notes);
        }

        public async Task<NoteDto?> GetNote(Guid userGuid, Guid noteGuid)
        {
            var note = await _databaseContext.Notes.FirstOrDefaultAsync(n => n.UserGuid == userGuid && n.Guid == noteGuid);
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

            _databaseContext.Notes.Add(note);
            await _databaseContext.SaveChangesAsync();

            return _mapper.Map<NoteDto>(note);
        }

        public async Task<NoteDto?> ChangeNote(Guid userGuid, Guid noteGuid, ChangeNoteDto changeNoteDto)
        {
            var note = await _databaseContext.Notes.FirstOrDefaultAsync(n => n.UserGuid == userGuid && n.Guid == noteGuid);
            if (note == null) return null;

            note.Name = changeNoteDto.Name;
            note.Content = changeNoteDto.Content;

            _databaseContext.Notes.Update(note);
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
