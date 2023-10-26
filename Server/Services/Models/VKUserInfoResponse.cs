using System.Text.Json.Serialization;

namespace Server.Services.Models
{
    public class VKUserInfoResponse
    {
        [JsonPropertyName("response")]
        public IList<VKUser>? Response { get; set; }

    }

    public class VKUser
    {
        [JsonPropertyName("id")]
        public long Id { get; set; }

        [JsonPropertyName("first_name")]
        public string? FirstName { get; set; }

        [JsonPropertyName("last_name")]
        public string? LastName { get; set; }
    }
}
