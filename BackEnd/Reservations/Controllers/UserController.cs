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
        private readonly IUserReservationRepository _apprepository;        //Dependency Injection, it uses an instance of SqlAppRepository

        public UserController(IUserReservationRepository apprepository)
        {
            this._apprepository = apprepository;
        }

        // GET: api/User
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<User>), 200)]
        public ActionResult<IEnumerable<User>> GetUsers()               //Returns all the users in the DB
        {
            try
            {
                return _apprepository.GetUsers().Result.ToList();
            }
            catch (Exception e)
            {
                Response.StatusCode = 505;
                throw new Exception(e.InnerException.Message);               
            }
        }

        // GET: api/User/contactName
        [HttpGet("{contactName}")]
        [ProducesResponseType(typeof(User), 200)]
        public ActionResult<User> GetUser(string contactName)           //Returns a user with the given contactName in the DB
        {
            try
            {
                var contact = _apprepository.GetUser(contactName);

                if (contact == null)
                {
                    Response.StatusCode = 404;
                    return new JsonResult("User Not Found");
                }

                return contact.Result;
            }
            catch (Exception e)
            {
                Response.StatusCode = 505;
                throw new Exception(e.InnerException.Message);                
            }
        }

        // PUT: api/User/contactName
        [HttpPut("{contactName}")]
        public IActionResult PutUser(string contactName, User user)     //Update the user with the given contactName in the DB
        {
            try
            {
                _apprepository.Update(user);
                return new JsonResult("ok");
            }
            catch (Exception e)
            {
                Response.StatusCode = 505;
                throw new Exception(e.InnerException.Message);                
            }            
        }

        // POST: api/User
        [HttpPost]
        public IActionResult PostUser(User user)                    //Insert the new user in the DB
        {
            try
            {
                _apprepository.Add(user);
                return new JsonResult("ok");
            }
            catch(Exception e)
            {
                Response.StatusCode = 505;
                throw new Exception(e.InnerException.Message);                
            }
             
        }
        


    }
}
