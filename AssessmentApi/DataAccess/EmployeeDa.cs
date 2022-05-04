using DataAccess.Database;
using Models;
using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public interface IEmployeeDa
    {
        public IList<Employee> Get();
        public Employee Add(Employee employee);
        public int Update(Employee employee);
        public bool Delete(int employeeId);
    }
    public class EmployeeDa : IEmployeeDa
    {
        public EmployeeDa()
        {

        }

        public IList<Employee> Get()
        {
            var conn = Connection.CreateConnection();

            SQLiteDataReader reader;
            SQLiteCommand command;

            command = conn.CreateCommand();
            command.CommandText = "SELECT * FROM Employee";

            reader = command.ExecuteReader();

            var employees = new List<Employee>();

            while (reader.Read())
            {
                employees.Add(new Employee()
                {
                    Id = reader.GetInt32(0),
                    Name = reader.GetString(1),
                    PhoneNumber = reader.GetString(2),
                    Email = reader.GetString(3),
                    Fax = reader.GetString(4)
                });
            }

            conn.Close();

            return employees;
        }

        public Employee Add(Employee employee)
        {
            var conn = Connection.CreateConnection();

            SQLiteDataReader reader;
            SQLiteCommand command;

            command = conn.CreateCommand();
            command.CommandText = $"INSERT INTO Employee (name, phoneNumber, email, fax)" +
                $"VALUES ('{employee.Name}', '{employee.PhoneNumber}', '{employee.Email}', '{employee.Fax}')";

            Employee result;
            try
            {
                command.ExecuteNonQuery();

                var lastInsertedRowId = (int)conn.LastInsertRowId;

                result = GetById(lastInsertedRowId);
            }
            catch (Exception e)
            {
                result = new Employee();
            }

            conn.Close();

            return result;
        }

        public int Update(Employee employee)
        {
            var conn = Connection.CreateConnection();

            SQLiteDataReader reader;
            SQLiteCommand command;

            command = conn.CreateCommand();
            command.CommandText = $"UPDATE Employee SET " +
                $"name = '{employee.Name}'," +
                $"phoneNumber = '{employee.PhoneNumber}'," +
                $"fax = '{employee.Fax}'," +
                $"email = '{employee.Email}'" +
                $"WHERE id = {employee.Id};";

            int result;
            try
            {
                command.ExecuteNonQuery();

                result = employee.Id;
            }
            catch (Exception e)
            {
                result = 0;
            }

            conn.Close();

            return result;
        }

        public bool Delete(int employeeId)
        {
            var conn = Connection.CreateConnection();

            SQLiteDataReader reader;
            SQLiteCommand command;

            command = conn.CreateCommand();
            command.CommandText = $"DELETE FROM Employee WHERE id = {employeeId}";

            int result;
            try
            {
                result = command.ExecuteNonQuery();
            } catch(Exception e)
            {
                result = 0;
            }
            
            conn.Close();

            return result > 0;
        }

        private Employee GetById(int employeeId)
        {
            var conn = Connection.CreateConnection();

            SQLiteDataReader reader;
            SQLiteCommand command;

            command = conn.CreateCommand();
            command.CommandText = $"SELECT * FROM Employee WHERE id = {employeeId}";

            reader = command.ExecuteReader();

            var employees = new List<Employee>();

            while (reader.Read())
            {
                employees.Add(new Employee()
                {
                    Id = reader.GetInt32(0),
                    Name = reader.GetString(1),
                    PhoneNumber = reader.GetString(2),
                    Email = reader.GetString(3)
                });
            }

            conn.Close();

            return employees.SingleOrDefault();
        }
    }
}
