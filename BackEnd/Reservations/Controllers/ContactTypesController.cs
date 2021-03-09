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
    public class ContactTypesController : ControllerBase
    {
        private readonly IUserReservationRepository _apprepository;                //Dependency Injection, it uses an instance of SqlAppRepository

        public ContactTypesController(IUserReservationRepository apprepository)
        {
            _apprepository = apprepository;
        }

        // GET: api/ContactTypes
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<ContactType>), 200)]
        public ActionResult<IEnumerable<ContactType>> GetContactTypes()
        {            
            try
            {
                return _apprepository.GetContactType().Result.ToList();
            }
            catch(Exception e)
            {
                Response.StatusCode = 505;
                throw new Exception(e.InnerException.Message);               
            }
        }

    }
}