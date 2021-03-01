using Microsoft.EntityFrameworkCore;
using ReservatiosDataAcces.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ReservationDataAcces.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            :base(options)
        {
                
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<ContactType> ContactTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            //modelBuilder.Entity<User>().HasMany( r => r.).


            modelBuilder.Entity<ContactType>().HasData(
                new ContactType
                {
                    ContactTypeName = "Contact_Type_1",
                    Decription = "Contact_Type_1"
                },
                new ContactType
                {
                    ContactTypeName = "Contact_Type_2",
                    Decription = "Contact_Type_2"
                },
                new ContactType
                {
                   ContactTypeName = "Contact_Type_3",
                   Decription = "Contact_Type_3"
                }
                );
        }

    }
}
