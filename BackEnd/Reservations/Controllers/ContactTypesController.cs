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
        private readonly IContact_Type _contact_Type;

        public ContactTypesController(IContact_Type contact_Type)
        {
            _contact_Type = contact_Type;
        }

        // GET: api/ContactTypes
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<ContactType>), 200)]
        public ActionResult<IEnumerable<ContactType>> GetContactTypes()
        {
            return _contact_Type.GetContact_Type().Result.ToList();
        }

    }
}