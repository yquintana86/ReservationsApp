using ReservationDataAcces.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ReservatiosDataAcces.Models
{
    public class ContactType
    {
        //ContactType Properties

        [Key]
        public string ContactTypeName{ get; set; }
        public string Decription { get; set; }        
        public ICollection<User> Users { get; set; }

    }

}
