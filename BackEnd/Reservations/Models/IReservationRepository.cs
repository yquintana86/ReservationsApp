using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReservationDataAcces.Models;


namespace ReservationsBackEnd.Models
{
    public interface IReservationRepository
    {
        Task<IEnumerable<Reservation>> GetReservations();
        Task<Reservation> GetReservation(int id);
        Task<Reservation> Update(Reservation reservation);
        Task<IEnumerable<Reservation>> GetByDateAsc();
        Task<IEnumerable<Reservation>> GetByDateDesc();
        Task<IEnumerable<Reservation>> GetByAlphabeticAsc();
        Task<IEnumerable<Reservation>> GetByAlphabeticDesc();
        Task<IEnumerable<Reservation>> GetByRanking();
        Reservation Add(Reservation reservation);
        bool ReservationExists(int id);
    }
}
