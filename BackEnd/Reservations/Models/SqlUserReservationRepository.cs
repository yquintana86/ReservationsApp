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
    public class SqlUserReservationRepository : IUserReservationRepository
    {
        private readonly AppDbContext _context;

        public SqlUserReservationRepository(AppDbContext Context)
        {
            this._context = Context;
        }


        public async Task<IEnumerable<Reservation>> GetReservations()        //Return all the reservations 
        {
            try
            {
                return await _context.Reservations.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("", ex);
            }

        }


        public async Task<Reservation> GetReservation(int id)               //Return one the reservations by a given id
        {
            try
            {
                return await _context.Reservations.FindAsync(id);
            }
            catch (Exception ex)
            {
                throw new Exception("", ex);
            }
        }

        public void Add(Reservation reservation)
        {
            try
            {
                _context.Reservations.Add(reservation);
                Thread.Sleep(500);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("", ex);
            }

        }

        public void Update(Reservation reservation)      //Update one reservations 
        {
            try
            {
                _context.Entry(reservation).State = EntityState.Modified;
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("", ex);
            }
        }

        public bool ReservationExists(int id)                               //Look for if a reservation exist by its id 
        {
            try
            {
                return _context.Reservations.Any(e => e.IDReservation == id);
            }
            catch (Exception ex)
            {
                throw new Exception("", ex);
            }
        }

        public async Task<IEnumerable<Reservation>> GetByDateAsc()       //Excecute the storage procedure "SP_ReservByDateASC" in de DB and return all the reservations ordered by date ascending
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
                                IDReservation = Convert.ToInt32(reader["IDReservation"].ToString()),
                                ContactName = reader["ContactName"].ToString(),
                                ReservationDate = Convert.ToDateTime(reader["ReservationDate"].ToString()),
                                ReservationInfo = reader["ReservationInfo"].ToString(),
                                Voters = Convert.ToInt32(reader["voters"].ToString()),
                                Votings = Convert.ToInt32(reader["votings"].ToString()),
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
        public async Task<IEnumerable<Reservation>> GetByDateDesc()         //Excecute the storage procedure "SP_ReservByDateDESC" in de DB and return all the reservations ordered by date descending
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
                                IDReservation = Convert.ToInt32(reader["IDReservation"].ToString()),
                                ContactName = reader["ContactName"].ToString(),
                                ReservationDate = Convert.ToDateTime(reader["ReservationDate"].ToString()),
                                ReservationInfo = reader["ReservationInfo"].ToString(),
                                Voters = Convert.ToInt32(reader["voters"].ToString()),
                                Votings = Convert.ToInt32(reader["votings"].ToString()),
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
        public async Task<IEnumerable<Reservation>> GetByAlphabeticAsc()    //Excecute the storage procedure "SP_ReservByAlphabeticASC" in de DB and return all the reservations ordered alphabetically ascending
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
                                IDReservation = Convert.ToInt32(reader["IDReservation"].ToString()),
                                ContactName = reader["ContactName"].ToString(),
                                ReservationDate = Convert.ToDateTime(reader["ReservationDate"].ToString()),
                                ReservationInfo = reader["ReservationInfo"].ToString(),
                                Voters = Convert.ToInt32(reader["voters"].ToString()),
                                Votings = Convert.ToInt32(reader["votings"].ToString()),
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
        public async Task<IEnumerable<Reservation>> GetByAlphabeticDesc()   //Excecute the storage procedure "SP_ReservByAlphabeticDESC" in de DB and return all the reservations ordered alphabetically desscending
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
                                IDReservation = Convert.ToInt32(reader["IDReservation"].ToString()),
                                ContactName = reader["ContactName"].ToString(),
                                ReservationDate = Convert.ToDateTime(reader["ReservationDate"].ToString()),
                                ReservationInfo = reader["ReservationInfo"].ToString(),
                                Voters = Convert.ToInt32(reader["voters"].ToString()),
                                Votings = Convert.ToInt32(reader["votings"].ToString()),
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

        public async Task<IEnumerable<Reservation>> GetByRanking()          //Excecute the storage procedure "SP_ByRanking" in de DB and return all the reservations ordered by Ranking
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
                                IDReservation = Convert.ToInt32(reader["IDReservation"].ToString()),
                                ContactName = reader["ContactName"].ToString(),
                                ReservationDate = Convert.ToDateTime(reader["ReservationDate"].ToString()),
                                ReservationInfo = reader["ReservationInfo"].ToString(),
                                Voters = Convert.ToInt32(reader["voters"].ToString()),
                                Votings = Convert.ToInt32(reader["votings"].ToString()),
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

        public async Task<IEnumerable<User>> GetUsers()                             //Return all the users in de DB
        {
            try
            {
                return await _context.Users.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("", ex);
            }
        }

        public async Task<User> GetUser(string contactName)                        //Return the user in de DB with the given contactName
        {
            try
            {
                return await _context.Users.FindAsync(contactName);
            }
            catch (Exception ex)
            {
                throw new Exception("", ex);
            }
        }

        public void Add(User user)                                              //Insert the user in de DB
        {
            try
            {
                _context.Users.Add(user);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("", ex);
            }
        }

        public void Update(User user)                                     //Update the given user in de DB 
        {
            try
            {
                _context.Entry(user).State = EntityState.Modified;
                 _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("", ex);
            }

        }
        public bool UserExists(string contact_name)                             //Return if a user exist in the DB
        {
            try
            {
                return _context.Users.Any(e => e.ContactName == contact_name);
            }
            catch (Exception ex)
            {
                throw new Exception("", ex);
            }
        }
        public async Task<IEnumerable<ContactType>> GetContactType()           //Return all the ContactType in the DB
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
