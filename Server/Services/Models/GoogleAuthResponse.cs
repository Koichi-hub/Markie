﻿using System.Text.Json.Serialization;

namespace Server.Services.Models
{
    public class GoogleAuthResponse
    {
        [JsonPropertyName("access_token")]
        public string? AccessToken { get; set; }
    }
}
