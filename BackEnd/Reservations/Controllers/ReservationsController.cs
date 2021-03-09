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
        private readonly IUserReservationRepository _apprepository;             //Dependency Injection, it uses an instance of SqlUserReservationRepository
                                                                                 

        public ReservationsController(IUserReservationRepository apprepository)
        {
            _apprepository = apprepository;
        }

        // GET: api/Reservations
        [HttpGet]
        public ActionResult<IEnumerable<Reservation>> GetReservations()
        {
            try
            {
                return _apprepository.GetReservations().Result.ToList();
            }

            catch(Exception e)
            {
                Response.StatusCode = 505;
                throw new Exception(e.InnerException.Message);               
            }

        }

        // GET: api/Reservations/5
        [HttpGet("{id}")]
        public ActionResult<Reservation> GetReservation(int id)                     //Return the reservation with the given id in the DB
        {
            try
            {
                var reserv = _apprepository.GetReservation(id);
                if (reserv == null)
                {
                    Response.StatusCode = 404;
                    return new JsonResult("Not");
                }

                return reserv.Result;
            }

            catch (Exception e)
            {
                Response.StatusCode = 505;
                throw new Exception(e.InnerException.Message);               
            }
        }
            

        // PUT: api/Reservations/5
        [HttpPut("{id}")]
        public IActionResult PutReservation(int id, Reservation reservation)            //Update the reservation in the DB
        {
            try
            {
                _apprepository.Update(reservation);
                return new JsonResult("ok");
            }

            catch (Exception e)
            {
                Response.StatusCode = 505;
                throw new Exception(e.InnerException.Message);                
            }

            
        }

        // POST: api/Reservations
        [HttpPost]
        public IActionResult PostReservation(Reservation reservation)            //Insert the reservation in the DB
        {
            try {
                _apprepository.Add(reservation);
                return new JsonResult("ok");
            }
            catch (Exception e)
            {
                Response.StatusCode = 505;
                throw new Exception(e.InnerException.Message);                
            }

        }

        // GET: api/Reservations/ascendentbydate
        [HttpGet("ascendentbydate")]
        [ProducesResponseType(typeof(IEnumerable<Reservation>), 200)]           //Return all the reservations ordered by date ascending
        public ActionResult<IEnumerable<Reservation>> Ascendentbydate()
        {
            try
            {
                return _apprepository.GetByDateAsc().Result.ToList();
            }
            catch (Exception e)
            {
                Response.StatusCode = 505;
                throw new Exception(e.InnerException.Message);                
            }
        }

        // GET: api/Reservations/descendentbydate
        [HttpGet("descendentbydate")]
        [ProducesResponseType(typeof(IEnumerable<Reservation>), 200)]
        public ActionResult<IEnumerable<Reservation>> Descendentbydate()        //Return all the reservations ordered by date descending
        {
            try
            {
                return _apprepository.GetByDateDesc().Result.ToList();
            }
            catch (Exception e)
            {
                Response.StatusCode = 505;
                throw new Exception(e.InnerException.Message);                
            }
        }

        // GET: api/Reservations/alphabeticacs
        [HttpGet("alphabeticacs")]
        [ProducesResponseType(typeof(IEnumerable<Reservation>), 200)]
        public ActionResult<IEnumerable<Reservation>> Alphabeticacs()       //Return all the reservations ordered alphabetically ascending
        {
            try
            {
                return _apprepository.GetByAlphabeticAsc().Result.ToList();
            }
            catch (Exception e)
            {
                Response.StatusCode = 505;
                throw new Exception(e.InnerException.Message);                
            }
        }

        // GET: api/Reservations/alphabeticdesc
        [HttpGet("alphabeticdesc")]
        [ProducesResponseType(typeof(IEnumerable<Reservation>), 200)]
        public ActionResult<IEnumerable<Reservation>> Alphabeticdesc()          //Return all the reservations ordered alphabetically descending
        {
            try
            {
                return _apprepository.GetByAlphabeticDesc().Result.ToList();
            }
            catch (Exception e)
            {
                Response.StatusCode = 505;
                throw new Exception(e.InnerException.Message);                
            }
        }

        // GET: api/Reservations/byranking
        [HttpGet("byranking")]
        [ProducesResponseType(typeof(IEnumerable<Reservation>), 200)]
        public ActionResult<IEnumerable<Reservation>> Byranking()            //Return all the reservations ordered by ranking
        {
            try
            {
                return _apprepository.GetByRanking().Result.ToList();
            }
            catch (Exception e)
            {
                Response.StatusCode = 505;
                throw new Exception(e.InnerException.Message);               
            }
        }

    }
}