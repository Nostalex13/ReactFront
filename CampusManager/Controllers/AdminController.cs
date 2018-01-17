using System.Collections.Generic;
using System.Linq;
using CampusManager.DbData;
using CampusManager.Helpers;
using CampusManager.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CampusManager.Controllers
{

    [Route("[controller]/[action]")]
    public class AdminController : Controller
    {
        [Authorize(Roles = RoleModel.Admin)]
        [HttpGet]
        public IActionResult GetUsers()
        {
            List<User> users = new List<User>();
            using (ApplicationDbContext dbContext = new ApplicationDbContext(ApplicationDbContext.Options))
                users = dbContext.Users.ToList();
            users.Select(user => user.Password = string.Empty);
            return Json(users);
        }

        [Authorize(Roles = RoleModel.Admin)]
        [HttpPost]
        public IActionResult AddUser([FromBody] User user)
        {
            user.Password = AuthHelper.GetHashFromPassword(user.Password);
            using (ApplicationDbContext dbContext = new ApplicationDbContext(ApplicationDbContext.Options))
            {
                try
                {
                    dbContext.Users.Add(user);
                    dbContext.SaveChanges();
                }
                catch
                {
                    return Forbid();
                }
            }
            using (EmailManager manager = new EmailManager())
            {
                manager.SendEmailWithRegistration(user.Email, user.Password);
            }
            return Ok();
        }

        [Authorize(Roles = RoleModel.Admin)]
        [HttpGet]
        public IActionResult DeleteUser(string email)
        {
            using (ApplicationDbContext dbContext = new ApplicationDbContext(ApplicationDbContext.Options))
            {
                User user = dbContext.Users.FirstOrDefault(seachedUser => seachedUser.Email == email);
                if (user == null)
                    return Forbid();
                dbContext.Users.Remove(user);
                dbContext.SaveChanges();
            }
            return Ok();
        }

    }
}
