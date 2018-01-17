using System;
using System.Data.Common;
using CampusManager.Models;
using Microsoft.EntityFrameworkCore;

namespace CampusManager.DbData
{
    public class ApplicationDbContext : DbContext
    {
        public static string ConnectionString { get; set; }

        public static DbContextOptions<ApplicationDbContext> Options
        {
            get
            {
                var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
                optionsBuilder.UseNpgsql(ConnectionString);
                return optionsBuilder.Options;
            }
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Income> Incomes { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>().HasIndex(u => u.Email).IsUnique();
        }
    }
}
