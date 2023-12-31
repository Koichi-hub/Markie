﻿using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Server.Configuration;
using Server.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Server.Services
{
    public class JWTService : IJWTService
    {
        private readonly JWTSettings _jWTSettings;

        public JWTService(IOptions<JWTSettings> jWTSettings)
        {
            _jWTSettings = jWTSettings.Value;
        }

        public string CreateToken(string sessionGuid, string userGuid, bool isAccessToken)
        {
            var keyBytes = Encoding.UTF8.GetBytes(_jWTSettings.SigningKey);
            var symmetricKey = new SymmetricSecurityKey(keyBytes);

            var signingCredentials = new SigningCredentials(symmetricKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>()
            {
                new Claim("sessionGuid", sessionGuid),
                new Claim("userGuid", userGuid)
            };

            var expirationSeconds = isAccessToken ? 
                TimeSpan.FromMinutes(_jWTSettings.AccessTokenExpirationMinutes) :
                TimeSpan.FromDays(_jWTSettings.RefreshTokenExpirationDays);
            var token = new JwtSecurityToken(
                issuer: _jWTSettings.Issuer,
                audience: _jWTSettings.Audience,
                claims: claims,
                expires: DateTime.UtcNow.Add(expirationSeconds),
                signingCredentials: signingCredentials
            );

            var rawToken = new JwtSecurityTokenHandler().WriteToken(token);
            return rawToken;
        }

        public (string?, string?) IsValidAccessToken(string accessToken)
        {
            var keyBytes = Encoding.UTF8.GetBytes(_jWTSettings.SigningKey);
            var symmetricKey = new SymmetricSecurityKey(keyBytes);

            var handler = new JwtSecurityTokenHandler();
            var validations = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = symmetricKey,
                ValidateIssuer = false,
                ValidateAudience = false
            };
            handler.ValidateToken(accessToken, validations, out var securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;

            var sessionGuid = jwtSecurityToken?.Claims.First(c => c.Type == "sessionGuid").Value;
            var userGuid = jwtSecurityToken?.Claims.First(c => c.Type == "userGuid").Value;
            return (sessionGuid, userGuid);
        }
    }
}
