using AgendaCoreAPI.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class ApplicationUserModel
    {
        [Required]
        [MinLength(6)]
        [RegularExpression("^[a-zA-Z][a-zA-Z0-9._]*[a-zA-Z0-9]$")]
        public string UserName { get; set; }

        [Required]
        [MinLength(2)]
        public string FirstName { get; set; }

        [Required]
        [MinLength(2)]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        [RegularExpression("^[a-zA-Z][a-zA-Z0-9._@]*[a-zA-Z]$")]
        public string Email { get; set; }

        [Required]
        [MinLength(10)]
        [MaxLength(16)]
        [RegularExpression("^[0-9]*$")]
        public string PhoneNumber { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }

    }
}
