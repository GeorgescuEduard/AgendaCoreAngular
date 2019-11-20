using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace AgendaCoreAPI.Models
{
    public class ContactDetail
    {
        [Key]
        public int ContactId { get; set; }

        [Required]
        [Column(TypeName = "varchar(40)")]
        public string Name { get; set; }

        [Required]
        [Column(TypeName = "varchar(16)")]
        public string PhoneNumber { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string Adress { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string Email { get; set; }

        public string UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual ApplicationUser ApplicationUsers { get; set; }


    }
}