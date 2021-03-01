using ReservatiosDataAcces.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ReservationDataAcces.Models
{
    public class Reservation
    {
        [Key]
        public int ID_Reservation { get; set; }
        [Required]
        public string ReservationInfo { get; set; }
        [Required]
        public DateTime Fecha_Reservacion { get; set; }
        public int Votings { get; set; }
        public int Voters { get; set; }
        [Required]
        [Column(TypeName = "varchar(8)")]
        public string ContactName { get; set; }        
    }
}
