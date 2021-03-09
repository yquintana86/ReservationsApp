using ReservationDataAcces.Models;
using ReservatiosDataAcces.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationsBackEnd.Models
{
    public interface IUserReservationRepository             //It has all the methods that any repository class should has in order to use dependency injection 
    {                                                       //A new class can use files instead of database to store the data and it has to implement this interface 
        Task<IEnumerable<ContactType>> GetContactType();    
        Task<IEnumerable<Reservation>> GetReservations();
        Task<Reservation> GetReservation(int id);
        void Update(Reservation reservation);
        Task<IEnumerable<Reservation>> GetByDateAsc();
        Task<IEnumerable<Reservation>> GetByDateDesc();
        Task<IEnumerable<Reservation>> GetByAlphabeticAsc();
        Task<IEnumerable<Reservation>> GetByAlphabeticDesc();
        Task<IEnumerable<Reservation>> GetByRanking();
        void Add(Reservation reservation);
        bool ReservationExists(int id);
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUser(string name);
        void Update(User user);
        void Add(User user);
        bool UserExists(string contact_name);
    }
}
