using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AgendaCoreAPI.Models;
using WebAPI.Models;
using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactDetailController : ControllerBase
    {
        private readonly AuthentificationContext _context;

        public ContactDetailController(AuthentificationContext context)
        {
            _context = context;
        }

        // GET: api/ContactDetail
       

        
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<ContactDetail>>> GetContactDetail(string id, int skip, int take)
        {

            return await _context.ContactDetails.Where(t => t.UserId == id).Skip(skip).Take(take).ToListAsync();

        }

        // PUT: api/ContactDetail/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutContactDetail(int id, ContactDetail contactDetail)
        {
            if (id != contactDetail.ContactId)
            {
                return BadRequest();
            }

            _context.Entry(contactDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactDetailExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ContactDetail
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<ContactDetail>> PostContactDetail(ContactDetail contactDetail)
        {
            _context.ContactDetails.Add(contactDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContactDetail", new { id = contactDetail.ContactId }, contactDetail);
        }

        // DELETE: api/ContactDetail/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<ContactDetail>> DeleteContactDetail(int id)
        {
            var contactDetail = await _context.ContactDetails.FindAsync(id);
            if (contactDetail == null)
            {
                return NotFound();
            }

            _context.ContactDetails.Remove(contactDetail);
            await _context.SaveChangesAsync();

            return contactDetail;
        }

        private bool ContactDetailExists(int id)
        {
            return _context.ContactDetails.Any(e => e.ContactId == id);
        }
    }
}
