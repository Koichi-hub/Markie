using System.Text.Json.Serialization;

namespace Server.Services.Models
{
    public class UserAuthorizedDto
    {
        [JsonPropertyName("access_token")]
        public string AccessToken { get; set; } = null!;

		[JsonPropertyName("user")]
		public UserDto User { get; set; } = null!;
	}
}
