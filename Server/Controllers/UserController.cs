using Microsoft.AspNetCore.Mvc;
using Server.Attributes;
using Server.Services.Interfaces;
using Server.Services.Models;

namespace Server.Controllers
{
    [CustomAuthorize]
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IHttpContextAccessor _httpContextAccessor = null!;
        private readonly IUserService _userService;
        private readonly ITagService _tagService;
        private readonly INoteService _noteService;
        private readonly Guid authorizedUserGuid; 

        public UserController(
            IHttpContextAccessor httpContextAccessor, 
            IUserService userService,
            ITagService tagService,
            INoteService noteService
        )
        {
            _httpContextAccessor = httpContextAccessor;
            _userService = userService;
            _tagService = tagService;
            _noteService = noteService;

            var guid = _httpContextAccessor?.HttpContext?.User?.Identity?.Name;
            authorizedUserGuid = Guid.Parse(guid!);
        }

        // users
        [HttpGet("me")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetUserByGuid()
        {
            var user = await _userService.GetUserByGuid(authorizedUserGuid);
            if (user == null) return StatusCode(StatusCodes.Status404NotFound);

            return Ok(user);
        }

        [HttpGet("{userGuid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetUserByGuid([FromRoute] Guid userGuid)
        {
            if (authorizedUserGuid != userGuid) return StatusCode(StatusCodes.Status403Forbidden);

            var user = await _userService.GetUserByGuid(userGuid);
            if (user == null) return StatusCode(StatusCodes.Status404NotFound);

            return Ok(user);
        }

        [HttpPut("{userGuid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> ChangeUser([FromRoute] Guid userGuid, [FromBody] ChangeUserDto changeUserDto)
        {
            if (authorizedUserGuid != userGuid) return StatusCode(StatusCodes.Status403Forbidden);

            var user = await _userService.ChangeUser(userGuid, changeUserDto);
            if (user == null) return StatusCode(StatusCodes.Status404NotFound);

            return Ok(user);
        }

        // tags
        [HttpGet("{userGuid}/tags")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetTags([FromRoute] Guid userGuid)
        {
            if (authorizedUserGuid != userGuid) return StatusCode(StatusCodes.Status403Forbidden);

            var tags = await _tagService.GetTags(userGuid);
            if (tags == null) return StatusCode(StatusCodes.Status404NotFound);

            return Ok(tags);
        }

        [HttpPost("{userGuid}/tags")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> CreateTag([FromRoute] Guid userGuid, [FromBody] CreateTagDto createTagDto)
        {
            if (authorizedUserGuid != userGuid) return StatusCode(StatusCodes.Status403Forbidden);

            var tag = await _tagService.CreateTag(userGuid, createTagDto);
            if (tag == null) return StatusCode(StatusCodes.Status404NotFound);

            return Ok(tag);
        }

        [HttpPut("{userGuid}/tags/{tagGuid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> ChangeTag([FromRoute] Guid userGuid, [FromRoute] Guid tagGuid, [FromBody] ChangeTagDto changeTagDto)
        {
            if (authorizedUserGuid != userGuid) return StatusCode(StatusCodes.Status403Forbidden);

            var tag = await _tagService.ChangeTag(userGuid, tagGuid, changeTagDto);
            if (tag == null) return StatusCode(StatusCodes.Status404NotFound);

            return Ok(tag);
        }

        [HttpDelete("{userGuid}/tags/{tagGuid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteTag([FromRoute] Guid userGuid, [FromRoute] Guid tagGuid)
        {
            if (authorizedUserGuid != userGuid) return StatusCode(StatusCodes.Status403Forbidden);

            var tag = await _tagService.DeleteTag(userGuid, tagGuid);
            if (tag == null) return StatusCode(StatusCodes.Status404NotFound);

            return Ok(tag);
        }

        [HttpPost("{userGuid}/tags/delete-some")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteTag([FromRoute] Guid userGuid, [FromBody] List<Guid> tagsGuids)
        {
            if (authorizedUserGuid != userGuid) return StatusCode(StatusCodes.Status403Forbidden);

            var tags = await _tagService.DeleteTags(userGuid, tagsGuids);
            if (tags == null) return StatusCode(StatusCodes.Status404NotFound);

            return Ok(tags);
        }

        // notes
        [HttpGet("{userGuid}/tags/{tagGuid}/notes")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetNotesByTag([FromRoute] Guid userGuid, [FromRoute] Guid tagGuid)
        {
            if (authorizedUserGuid != userGuid) return StatusCode(StatusCodes.Status403Forbidden);

            var notes = await _noteService.GetNotesByTag(userGuid, tagGuid);
            if (notes == null) return StatusCode(StatusCodes.Status404NotFound);

            return Ok(notes);
        }

        [HttpGet("{userGuid}/notes")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetNotes([FromRoute] Guid userGuid)
        {
            if (authorizedUserGuid != userGuid) return StatusCode(StatusCodes.Status403Forbidden);

            var notes = await _noteService.GetNotes(userGuid);
            if (notes == null) return StatusCode(StatusCodes.Status404NotFound);

            return Ok(notes);
        }

        [HttpGet("{userGuid}/notes/{noteGuid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetNote([FromRoute] Guid userGuid, [FromRoute] Guid noteGuid)
        {
            if (authorizedUserGuid != userGuid) return StatusCode(StatusCodes.Status403Forbidden);

            var note = await _noteService.GetNote(userGuid, noteGuid);
            if (note == null) return StatusCode(StatusCodes.Status404NotFound);

            return Ok(note);
        }

        [HttpPost("{userGuid}/notes")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> CreateNote([FromRoute] Guid userGuid, [FromBody] CreateNoteDto createNoteDto)
        {
            if (authorizedUserGuid != userGuid) return StatusCode(StatusCodes.Status403Forbidden);

            var note = await _noteService.CreateNote(userGuid, createNoteDto);
            if (note == null) return StatusCode(StatusCodes.Status404NotFound);

            return Ok(note);
        }

        [HttpPut("{userGuid}/notes/{noteGuid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> ChangeNote([FromRoute] Guid userGuid, [FromRoute] Guid noteGuid, [FromBody] ChangeNoteDto changeNoteDto)
        {
            if (authorizedUserGuid != userGuid) return StatusCode(StatusCodes.Status403Forbidden);

            var note = await _noteService.ChangeNote(userGuid, noteGuid, changeNoteDto);
            if (note == null) return StatusCode(StatusCodes.Status404NotFound);

            return Ok(note);
        }

        [HttpDelete("{userGuid}/notes/{noteGuid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteNote([FromRoute] Guid userGuid, [FromRoute] Guid noteGuid)
        {
            if (authorizedUserGuid != userGuid) return StatusCode(StatusCodes.Status403Forbidden);

            var note = await _noteService.DeleteNote(userGuid, noteGuid);
            if (note == null) return StatusCode(StatusCodes.Status404NotFound);

            return Ok(note);
        }
    }
}
