using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReservationDataAcces.Models;
using ReservationsBackEnd.Models;
using System.Data.SqlClient;

namespace ReservationsBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly IReservationRepository _apprepository;

        public ReservationsController(IReservationRepository reservation)
        {
            _apprepository = reservation;
        }

        // GET: api/Reservations
        [HttpGet]
        public ActionResult<IEnumerable<Reservation>> GetReservations()
        {
            return _apprepository.GetReservations().Result.ToList();

        }

        // GET: api/Reservations/5
        [HttpGet("{id}")]
        public ActionResult<Reservation> GetReservation(int id)
        {
            var reserv = _apprepository.GetReservation(id);

            if (reserv == null)
            {
                return NotFound();
            }

            return reserv.Result;
        }

        // PUT: api/Reservations/5
        [HttpPut("{id}")]
        public IActionResult PutReservation(int id, Reservation reservation)
        {
            if (id != reservation.ID_Reservation)
            {
                return BadRequest();
            }

            try
            {
                _apprepository.Update(reservation);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_apprepository.ReservationExists(id))
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

        // POST: api/Reservations
        [HttpPost]
        public ActionResult<Reservation> PostReservation(Reservation reservation)
        {
            return _apprepository.Add(reservation);
        }

        // GET: api/Reservations/ascendentbydate
        [HttpGet("ascendentbydate")]
        [ProducesResponseType(typeof(IEnumerable<Reservation>), 200)]
        public ActionResult<IEnumerable<Reservation>> Ascendentbydate()
        {
            try
            {
                return _apprepository.GetByDateAsc().Result.ToList();
            }
            catch
            {
                return BadRequest();
            }
        }

        // GET: api/Reservations/descendentbydate
        [HttpGet("descendentbydate")]
        [ProducesResponseType(typeof(IEnumerable<Reservation>), 200)]
        public ActionResult<IEnumerable<Reservation>> Descendentbydate()
        {
            try
            {
                return _apprepository.GetByDateDesc().Result.ToList();
            }
            catch
            {
                return BadRequest();
            }
        }

        // GET: api/Reservations/alphabeticacs
        [HttpGet("alphabeticacs")]
        [ProducesResponseType(typeof(IEnumerable<Reservation>), 200)]
        public ActionResult<IEnumerable<Reservation>> Alphabeticacs()
        {
            try
            {
                return _apprepository.GetByAlphabeticAsc().Result.ToList();
            }
            catch
            {
                return BadRequest();
            }
        }

        // GET: api/Reservations/alphabeticdesc
        [HttpGet("alphabeticdesc")]
        [ProducesResponseType(typeof(IEnumerable<Reservation>), 200)]
        public ActionResult<IEnumerable<Reservation>> Alphabeticdesc()
        {
            try
            {
                return _apprepository.GetByAlphabeticDesc().Result.ToList();
            }
            catch(Exception ex)
            {
                return BadRequest();
            }
        }

        // GET: api/Reservations/byranking
        [HttpGet("byranking")]
        [ProducesResponseType(typeof(IEnumerable<Reservation>), 200)]
        public ActionResult<IEnumerable<Reservation>> Byranking()
        {
            try
            {
                return _apprepository.GetByRanking().Result.ToList();
            }
            catch
            {
                return BadRequest();
            }
        }

    }
}