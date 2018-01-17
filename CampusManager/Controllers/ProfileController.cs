using System;
using System.Linq;
using CampusManager.DbData;
using CampusManager.Helpers;
using CampusManager.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CampusManager.Controllers
{

    [Route("[controller]/[action]")]
    public class ProfileController : Controller
    {
        [Authorize]
        [HttpGet]
        public IActionResult UserData()
        {
            User user;
            using (ApplicationDbContext dbContext = new ApplicationDbContext(ApplicationDbContext.Options))
                user = AuthHelper.GetUserByClaim(dbContext.Users.ToList(), User);
            if (user == null)
                return Forbid();
            return Json(user);
        }

        [Authorize]
        [HttpGet]
        public IActionResult ChangeData(string id, string email, string firstName, string lastName)
        {
            User user;
            using (ApplicationDbContext dbContext = new ApplicationDbContext(ApplicationDbContext.Options))
                user = dbContext.Users.Find(id);
            if (user == null)
                return StatusCode(500, "User not found");
            user.Email = email;
            user.FirstName = firstName;
            user.LastName = lastName;
            using (ApplicationDbContext dbContext = new ApplicationDbContext(ApplicationDbContext.Options))
            {
                dbContext.Entry(user).State = EntityState.Modified;
                dbContext.SaveChanges();
            }
            return Ok();
        }

        [Authorize(Roles = RoleModel.Admin)]
        [HttpGet]
        public IActionResult ChangeDataRole(string id, string email, string firstName, string lastName, string role)
        {
            User user;
            using (ApplicationDbContext dbContext = new ApplicationDbContext(ApplicationDbContext.Options))
                user = dbContext.Users.Find(id);
            if (user == null)
                return StatusCode(500, "User not found");
            user.Email = email;
            user.FirstName = firstName;
            user.LastName = lastName;
            user.Role = role;
            using (ApplicationDbContext dbContext = new ApplicationDbContext(ApplicationDbContext.Options))
            {
                dbContext.Entry(user).State = EntityState.Modified;
                dbContext.SaveChanges();
            }
            return Ok();
        }

        [Authorize]
        [HttpGet]
        public IActionResult ChangePassword(string email, string oldPassword, string newPassword, string newPasswordRepeat)
        {
            if (!string.Equals(newPassword, newPasswordRepeat))
                return StatusCode(403, "Passwords doesn't matches");
            User user;
            using (ApplicationDbContext dbContext = new ApplicationDbContext(ApplicationDbContext.Options))
                user = dbContext.Users.FirstOrDefault(searchedUser => searchedUser.Email == email);
            if (user == null)
                return StatusCode(500, "User not found");
            user.Password = AuthHelper.GetHashFromPassword(newPassword);
            using (ApplicationDbContext dbContext = new ApplicationDbContext(ApplicationDbContext.Options))
            {
                dbContext.Entry(user).State = EntityState.Modified;
                dbContext.SaveChanges();
            }
            return Ok();
        }
    }
}
