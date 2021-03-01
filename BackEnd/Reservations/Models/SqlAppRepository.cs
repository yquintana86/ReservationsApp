using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ReservationDataAcces.Models;
using System.Data.SqlClient;
using ReservatiosDataAcces.Models;

namespace ReservationsBackEnd.Models
{
    public class SqlAppRepository : IReservationRepository, IUserRepository, IContact_Type
    {
        private readonly AppDbContext _context;

        public SqlAppRepository(AppDbContext Context)
        {
            this._context = Context;
        }


        public async Task<IEnumerable<Reservation>> GetReservations()
        {
            return await _context.Reservations.ToListAsync();
        }


        public async Task<Reservation> GetReservation(int id)
        {
            return await _context.Reservations.FindAsync(id);
        }

        public Reservation Add(Reservation reservation)
        {
            _context.Reservations.Add(reservation);
            Thread.Sleep(500);
            _context.SaveChanges();
            return reservation;
        }

        public async Task<Reservation> Update(Reservation reservation)
        {
            var reserv = _context.Reservations.Attach(reservation);
            reserv.State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            await _context.SaveChangesAsync();
            return reservation;
        }

        public bool ReservationExists(int id)
        {
            return _context.Reservations.Any(e => e.ID_Reservation == id);
        }
        public async Task<IEnumerable<Reservation>> GetByDateAsc()
        {
            List<Reservation> reservations = new List<Reservation>();
            try
            {
                using (SqlConnection connection = (SqlConnection)_context.Database.GetDbConnection())
                {
                    SqlCommand cmd = connection.CreateCommand();
                    await connection.OpenAsync();
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.CommandText = "SP_ReservByDateASC";
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (reader.Read())
                        {
                            Reservation reserv = new Reservation
                            {
                                ID_Reservation = Convert.ToInt32(reader["ID_Reservation"].ToString()),
                                ContactName = reader["ContactName"].ToString(),
                                Fecha_Reservacion = Convert.ToDateTime(reader["Fecha_Reservacion"].ToString()),
                                ReservationInfo = reader["ReservationInfo"].ToString(),
                                Voters = Convert.ToInt32(reader["voters"].ToString()),
                                Votings = Convert.ToInt32(reader["votings"].ToString())
                            };
                            reservations.Add(reserv);
                        }
                    }
                    connection.Close();
                }
            }
            catch (SqlException ex)
            {
                throw new Exception("", ex);
            }
            return reservations;
        }
        public async Task<IEnumerable<Reservation>> GetByDateDesc()
        {
            List<Reservation> reservations = new List<Reservation>();
            try
            {
                using (SqlConnection connection = (SqlConnection)_context.Database.GetDbConnection())
                {
                    SqlCommand cmd = connection.CreateCommand();
                    await connection.OpenAsync();
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.CommandText = "SP_ReservByDateDESC";
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (reader.Read())
                        {
                            Reservation reserv = new Reservation
                            {
                                ID_Reservation = Convert.ToInt32(reader["ID_Reservation"].ToString()),
                                ContactName = reader["ContactName"].ToString(),
                                Fecha_Reservacion = Convert.ToDateTime(reader["Fecha_Reservacion"].ToString()),
                                ReservationInfo = reader["ReservationInfo"].ToString(),
                                Voters = Convert.ToInt32(reader["voters"].ToString()),
                                Votings = Convert.ToInt32(reader["votings"].ToString())
                            };
                            reservations.Add(reserv);
                        }
                    }
                    connection.Close();
                }
            }
            catch (SqlException ex)
            {
                throw new Exception("", ex);
            }
            return reservations;
        }
        public async Task<IEnumerable<Reservation>> GetByAlphabeticAsc()
        {
            List<Reservation> reservations = new List<Reservation>();
            try
            {
                using (SqlConnection connection = (SqlConnection)_context.Database.GetDbConnection())
                {
                    SqlCommand cmd = connection.CreateCommand();
                    await connection.OpenAsync();
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.CommandText = "SP_ReservByAlphabeticASC";
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (reader.Read())
                        {
                            Reservation reserv = new Reservation
                            {
                                ID_Reservation = Convert.ToInt32(reader["ID_Reservation"].ToString()),
                                ContactName = reader["ContactName"].ToString(),
                                Fecha_Reservacion = Convert.ToDateTime(reader["Fecha_Reservacion"].ToString()),
                                ReservationInfo = reader["ReservationInfo"].ToString(),
                                Voters = Convert.ToInt32(reader["voters"].ToString()),
                                Votings = Convert.ToInt32(reader["votings"].ToString())
                            };
                            reservations.Add(reserv);
                        }
                    }
                    connection.Close();
                }
            }
            catch (SqlException ex)
            {
                throw new Exception("", ex);
            }
            return reservations;
        }
        public async Task<IEnumerable<Reservation>> GetByAlphabeticDesc()
        {
            List<Reservation> reservations = new List<Reservation>();
            try
            {

                using (SqlConnection connection = (SqlConnection)_context.Database.GetDbConnection())
                {
                    SqlCommand cmd = connection.CreateCommand();
                    await connection.OpenAsync();
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.CommandText = "SP_ReservByAlphabeticDESC";
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (reader.Read())
                        {
                            Reservation reserv = new Reservation
                            {
                                ID_Reservation = Convert.ToInt32(reader["ID_Reservation"].ToString()),
                                ContactName = reader["ContactName"].ToString(),
                                Fecha_Reservacion = Convert.ToDateTime(reader["Fecha_Reservacion"].ToString()),
                                ReservationInfo = reader["ReservationInfo"].ToString(),
                                Voters = Convert.ToInt32(reader["voters"].ToString()),
                                Votings = Convert.ToInt32(reader["votings"].ToString())
                            };
                            reservations.Add(reserv);
                        }
                    }
                    connection.Close();
                }
            }
            catch (SqlException ex)
            {
                throw new Exception("", ex);
            }
            return reservations;
        }

        public async Task<IEnumerable<Reservation>> GetByRanking()
        {
            List<Reservation> reservations = new List<Reservation>();
            try
            {
                using (SqlConnection connection = (SqlConnection)_context.Database.GetDbConnection())
                {
                    SqlCommand cmd = connection.CreateCommand();
                    await connection.OpenAsync();
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.CommandText = "SP_ByRanking";
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (reader.Read())
                        {
                            Reservation reserv = new Reservation
                            {
                                ID_Reservation = Convert.ToInt32(reader["ID_Reservation"].ToString()),
                                ContactName = reader["ContactName"].ToString(),
                                Fecha_Reservacion = Convert.ToDateTime(reader["Fecha_Reservacion"].ToString()),
                                ReservationInfo = reader["ReservationInfo"].ToString(),
                                Voters = Convert.ToInt32(reader["voters"].ToString()),
                                Votings = Convert.ToInt32(reader["votings"].ToString())
                            };
                            reservations.Add(reserv);
                        }
                    }
                    connection.Close();
                }
            }
            catch (SqlException ex)
            {
                throw new Exception("", ex);
            }
            return reservations;
        }
        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetUser(string contact_name)
        {
            return await _context.Users.FindAsync(contact_name);
        }

        public User Add(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
            return user;
        }

        public async Task<User> Update(User user)
        {
            var userstatus = _context.Users.Attach(user);
            userstatus.State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            await _context.SaveChangesAsync();
            return user;
        }
        public bool UserExists(string contact_name)
        {
            return _context.Users.Any(e => e.ContactName == contact_name);
        }
        public async Task<IEnumerable<ContactType>> GetContact_Type()
        {
            List<ContactType> contactType = new List<ContactType>();
            try
            {
                using (SqlConnection connection = (SqlConnection)_context.Database.GetDbConnection())
                {
                    SqlCommand cmd = connection.CreateCommand();
                    await connection.OpenAsync();
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.CommandText = "SP_ContactTyeName";
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (reader.Read())
                        {
                            ContactType reserv = new ContactType
                            {
                                ContactTypeName = reader["ContactTypeName"].ToString(),
                                Decription = reader["Decription"].ToString(),
                            };
                            contactType.Add(reserv);
                        }
                    }
                    connection.Close();
                }
            }
            catch (SqlException ex)
            {
                throw new Exception("", ex);
            }
            return contactType;
        }
    }
}
