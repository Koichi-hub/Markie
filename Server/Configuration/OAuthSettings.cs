namespace Server.Configuration
{
    public class OAuthSettings
    {
        public Google Google { get; set; } = null!;
        public VK VK { get; set; } = null!;
    }

    public class Google
    {
        public string RedirectUri { get; set; } = null!;
        public string AuthUri { get; set; } = null!;
        public string TokenUri { get; set; } = null!;
        public string APIUri { get; set; } = null!;
        public string ResponseType { get; set; } = null!;
        public string AccessType { get; set; } = null!;
        public string GrantType { get; set; } = null!;
        public string Scope { get; set; } = null!;
        public string IncludeGrantedScopes { get; set; } = null!;
        public string ClientId { get; set; } = null!;
        public string ClientSecret { get; set; } = null!;
    }

    public class VK
    {
        public string RedirectUri { get; set; } = null!;
        public string AuthUri { get; set; } = null!;
        public string TokenUri { get; set; } = null!;
        public string APIUri { get; set; } = null!;
        public string APIVersion { get; set; } = null!;
        public string Display { get; set; } = null!;
        public string Scope { get; set; } = null!;
        public string ResponseType { get; set; } = null!;
        public string ClientId { get; set; } = null!;
        public string ClientSecret { get; set; } = null!;
    }
}
