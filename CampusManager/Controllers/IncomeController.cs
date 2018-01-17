using System;
using System.Collections.Generic;
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
    public class IncomeController : Controller
    {
        [Authorize]
        [HttpGet]
        public IActionResult AddIncome(string description, double sum, int? tax = null)
        {
            int realTax = (sum < 0) ? 0 : tax ?? 15;
            using (ApplicationDbContext dbContext = new ApplicationDbContext(ApplicationDbContext.Options))
            {
                try
                {
                    User user = AuthHelper.GetUserByClaim(dbContext.Users.ToList(), User);
                    Income newIncome = new Income
                    {
                        Description = description,
                        Sum = sum,
                        Tax = realTax,
                        AddDate = DateTime.Now,
                        OwnedUserId = user.Id,
                        OwnedUserName = user.FirstName + " " + user.LastName,
                        ClearIncome = (realTax != 0) ? sum - ((sum / 100) * realTax) : sum
                    };
                    dbContext.Incomes.Add(newIncome);
                    dbContext.Entry(newIncome).State = EntityState.Added;
                    dbContext.SaveChanges();
                }
                catch (Exception e)
                {
                    return BadRequest(e);
                }
            }
            return Ok();
        }

        [Authorize]
        [HttpGet]
        public IActionResult RemoveIncome(string incomeId)
        {
            try
            {
                using (ApplicationDbContext dbContext = new ApplicationDbContext(ApplicationDbContext.Options))
                {
                    User user = AuthHelper.GetUserByClaim(dbContext.Users.ToList(), User);
                    Income toDeleteIncome = dbContext.Incomes.FirstOrDefault(income => income.Id == incomeId);
                    if (toDeleteIncome == null)
                        return BadRequest();
                    if (user.Id != toDeleteIncome.OwnedUserId)
                        return Forbid();
                    dbContext.Incomes.Remove(toDeleteIncome);
                    dbContext.Entry(toDeleteIncome).State = EntityState.Deleted;
                    dbContext.SaveChanges();
                }
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetIncomes()
        {
            using (ApplicationDbContext dbContext = new ApplicationDbContext(ApplicationDbContext.Options))
                return Json(dbContext.Incomes.ToList());
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetTotalIncome()
        {
            try
            {
                using (ApplicationDbContext dbContext = new ApplicationDbContext(ApplicationDbContext.Options))
                {
                    double totalIncome = Enumerable.Sum(dbContext.Incomes, income => income.Sum);
                    return Ok(totalIncome);
                }

            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetTotalClearIncome()
        {
            try
            {
                using (ApplicationDbContext dbContext = new ApplicationDbContext(ApplicationDbContext.Options))
                {
                    double totalClearIncome = Enumerable.Sum(dbContext.Incomes, income => income.ClearIncome);
                    return Ok(totalClearIncome);
                }

            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetGraphData()
        {
            List<Income> incomes;
            using (ApplicationDbContext dbContext = new ApplicationDbContext(ApplicationDbContext.Options))
                incomes = dbContext.Incomes.ToList();
            List<GraphData> points = new List<GraphData>();
            double balance = 0;
            foreach (Income income in incomes)
            {
                balance += income.ClearIncome;
                points.Add(new GraphData
                {
                    PointDateTime = income.AddDate,
                    PointValue = balance
                });
            }
            return Json(points);
        }
    }
}
