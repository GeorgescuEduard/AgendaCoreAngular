using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountController : ControllerBase
    {
        private readonly AuthentificationContext _context;

        public CountController(AuthentificationContext context)
        {
            _context = context;
        }


        // GET: api/Count/5

        [HttpGet]
        public int GetContactCount(string id)
        {

            return _context.ContactDetails.Count(w => w.UserId == id);

        }
    }
}