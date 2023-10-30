using System.Text.Json.Serialization;

namespace Server.Services.Models
{
    public class UserAuthorizedDto
    {
        [JsonPropertyName("user")]
        public UserDto User { get; set; } = null!;
        [JsonPropertyName("accessToken")]
        public string AccessToken { get; set; } = null!;
    }
}
