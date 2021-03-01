using ReservationDataAcces.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationsBackEnd.Models
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUser(string name);
        Task<User> Update(User user);
        User Add(User user);
        bool UserExists(string contact_name);

    }
}
