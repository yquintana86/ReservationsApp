using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReservatiosDataAcces.Models;

namespace ReservationsBackEnd.Models
{
    public interface IContact_Type
    {
        Task<IEnumerable<ContactType>> GetContact_Type();
    }
}
