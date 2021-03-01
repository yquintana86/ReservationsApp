using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ReservatiosDataAcces.Models;

namespace ReservationDataAcces.Models
{
    public class User
    {
        [Key]
        [Column(TypeName = "varchar(8)")]
        public string ContactName { get; set; }
        [Required]
        [Column(TypeName = "varchar(11)")]
        public string PhoneNumber { get; set; }
        [Required]        
        public DateTime BirthDate { get; set; }
        [Required]
        public string ContactTypeName { get; set; }
        public ICollection<Reservation> Reservations { get; set; }

    }
}
