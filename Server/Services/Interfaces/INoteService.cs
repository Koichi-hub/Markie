using Server.Services.Models;

namespace Server.Services.Interfaces
{
    public interface INoteService
    {
        public Task<IList<NoteDto>?> GetNotesByTag(Guid userGuid, Guid tagGuid);
        public Task<IList<NoteDto>?> GetNotes(Guid userGuid);
        public Task<int> GetNotesCount(Guid userGuid);
        public Task<NoteDto?> GetNote(Guid userGuid, Guid noteGuid);
        public Task<NoteDto?> CreateNote(Guid userGuid, CreateNoteDto createNoteDto);
        public Task<NoteDto?> ChangeNote(Guid userGuid, Guid noteGuid, ChangeNoteDto changeNoteDto);
        public Task<NoteDto?> DeleteNote(Guid userGuid, Guid noteGuid);
    }
}
