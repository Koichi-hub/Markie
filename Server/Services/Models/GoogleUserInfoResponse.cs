using System.Text.Json.Serialization;

namespace Server.Services.Models
{
    public class GoogleUserInfoResponse
    {
        [JsonPropertyName("id")]
        public string? Id { get; set; }

		[JsonPropertyName("email")]
		public string? Email { get; set; }

		[JsonPropertyName("name")]
		public string? Name { get; set; }
	}
}
