using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CampusManager.Models
{
    public class Income
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }

        public string Description { get; set; }

        public string OwnedUserId { get; set; }

        public string OwnedUserName { get; set; }

        public DateTime AddDate { get; set; }

        public double Sum { get; set; }

        public int Tax { get; set; }

        public double ClearIncome { get; set; }
    }
}
