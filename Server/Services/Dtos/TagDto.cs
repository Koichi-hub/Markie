﻿namespace Server.Services.Dtos
{
    public class TagDto
    {
        public Guid Guid { get; set; }
        public string Name { get; set; } = null!;
        public Guid UserGuid { get; set; }
    }
}
