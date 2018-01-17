using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CampusManager.DbData;
using CampusManager.Helpers;
using CampusManager.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace CampusManager.Controllers
{
    [Route("[controller]/[action]")]
    public class AccountController : Controller
    {

        [HttpPost("/token")]
        public async Task Token()
        {
            var username = Request.Form["username"];
            var password = Request.Form["password"];
            ClaimsIdentity identity = null;
            using (ApplicationDbContext dbContext = new ApplicationDbContext(ApplicationDbContext.Options))
            {
                identity = AuthHelper.GetIdentity(dbContext.Users.ToList(), username, password);
            }

            if (identity == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Invalid username or password.");
                return;
            }

            var now = DateTime.UtcNow;
            // creating JWT tokens
            var jwt = new JwtSecurityToken(
                    issuer: AuthHelper.ISSUER,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthHelper.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthHelper.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                username = identity.Name
            };

            // serializing into JSON
            Response.ContentType = "application/json";
            await Response.WriteAsync(JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented }));
        }

        [HttpGet]
        public IActionResult RenewPassword(string email)
        {
            User foundUser;
            using (ApplicationDbContext dbContext = new ApplicationDbContext(ApplicationDbContext.Options))
                foundUser = dbContext.Users.FirstOrDefault(user => user.Email == email);
            if (foundUser == null)
                return StatusCode(403);
            string password = AuthHelper.GetRandomPassword();
            using (EmailManager manager = new EmailManager())
            {
                if (!manager.SendEmailWithRenew(foundUser.Email, password))
                    return StatusCode(405);
            }
            foundUser.Password = AuthHelper.GetHashFromPassword(password);
            try
            {
                using (ApplicationDbContext dbContext = new ApplicationDbContext(ApplicationDbContext.Options))
                {
                    dbContext.Users.Update(foundUser);
                    dbContext.Entry(foundUser).State = EntityState.Modified;
                    dbContext.SaveChanges();
                }
                return Ok();
            }
            catch
            {
                return StatusCode(405);
            }
        }

        [HttpPost]
        public IActionResult Register([FromBody] User user)
        {
            user.Password = AuthHelper.GetHashFromPassword(user.Password);
            using (ApplicationDbContext dbContext = new ApplicationDbContext(ApplicationDbContext.Options))
            {
                dbContext.Users.Add(user);
                dbContext.SaveChanges();
            }
            return Ok();
        }

    }
}
