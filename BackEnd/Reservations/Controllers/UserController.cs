using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReservationDataAcces.Models;
using ReservationsBackEnd.Models;
using ReservatiosDataAcces.Models;

namespace ReservationsBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _apprepository;

        public UserController(IUserRepository user)
        {
            this._apprepository = user;
        }

        // GET: api/User
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<User>), 200)]
        public ActionResult<IEnumerable<User>> GetUsers()
        {
            return _apprepository.GetUsers().Result.ToList();
        }

        // GET: api/User/5
        [HttpGet("{contact_name}")]
        [ProducesResponseType(typeof(User), 200)]
        public ActionResult<User> GetUser(string contact_name)
        {
            var contact = _apprepository.GetUser(contact_name);

            if (contact == null)
            {
                return NotFound();
            }

            return contact.Result;
        }

        // PUT: api/User/5
        [HttpPut("{contact_name}")]
        public IActionResult PutUser(string contact_name, User user)
        {
            if (contact_name != user.ContactName)
            {
                return BadRequest();
            }

            try
            {
                _apprepository.Update(user);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_apprepository.UserExists(contact_name))
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


        // POST: api/User
        [HttpPost]
        public ActionResult<User> PostUser(User user)
        {
            return _apprepository.Add(user);
        }

        //Get: api/User/exist
        [HttpGet("exist")]
        [ProducesResponseType(typeof(string), 200)]
        public ActionResult<bool> Exist(string contactName)
        {
            return _apprepository.UserExists(contactName);
        }


    }
}
