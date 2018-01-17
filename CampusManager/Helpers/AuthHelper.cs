using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using CampusManager.Models;
using Microsoft.IdentityModel.Tokens;

namespace CampusManager.Helpers
{
    public class AuthHelper
    {
        public const string ISSUER = "CampusManager"; // издатель токена
        const string KEY = "mysupersecret_secretkey!123";   // ключ для шифрации
        public const int LIFETIME = 1; // время жизни токена - 1 минута
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }

        public static ClaimsIdentity GetIdentity(List<User> people, string username, string password)
        {
            User person = people.FirstOrDefault(x => x.Email == username && x.Password == GetHashFromPassword(password));
            if (person == null) return null;
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, person.Email),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, person.Role)
            };
            ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
            return claimsIdentity;
        }

        internal static string GetHashFromPassword(string password)
        {
            MD5 md5 = MD5.Create();
            byte[] inputBytes = Encoding.ASCII.GetBytes(password);
            byte[] hash = md5.ComputeHash(inputBytes);

            StringBuilder sb = new StringBuilder();
            foreach (byte t in hash)
                sb.Append(t.ToString("X2"));

            return sb.ToString();
        }

        internal static User GetUserByClaim(List<User> people, ClaimsPrincipal userClaim)
        {
            return people.FirstOrDefault(user => string.Equals(user.Email, userClaim.Identity.Name, StringComparison.Ordinal));
        }

        public static string GetRandomPassword(int passwordCount = 8)
        {
            StringBuilder password = new StringBuilder();
            Random randomObj = new Random();
            while (password.Length < passwordCount)
            {
                char generatedChar = (char)randomObj.Next(33, 125);
                if (char.IsLetterOrDigit(generatedChar))
                    password.Append(generatedChar);
            }
            return password.ToString();
        }


    }
}
