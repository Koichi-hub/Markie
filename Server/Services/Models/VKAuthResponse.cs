using System.Text.Json.Serialization;

namespace Server.Services.Models
{
    public class VKAuthResponse
    {
        [JsonPropertyName("access_token")]
        public string? AccessToken { get; set; }

        [JsonPropertyName("user_id")]
        public long UserId { get; set; }
    }
}
