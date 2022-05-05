using DataAccess.Database;
using Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public interface IProjectDa
    {
        public IList<Project> Get();
        public Project Add(Project project);
        public int Update(Project project);
        public bool Delete(int projectId);
    }

    public class ProjectDa : IProjectDa
    {
        public ProjectDa()
        {

        }

        public IList<Project> Get()
        {
            var conn = Connection.CreateConnection();

            SQLiteDataReader reader;
            SQLiteCommand command;

            command = conn.CreateCommand();
            command.CommandText = "SELECT * FROM Project";

            reader = command.ExecuteReader();

            var projects = new List<Project>();

            while (reader.Read())
            {
                var contact = JsonConvert.DeserializeObject<Employee>(
                        reader.GetString(2));
                var status = reader.GetInt32(4);
                projects.Add(new Project()
                {
                    Id = reader.GetInt32(0),
                    Name = reader.GetString(1),
                    Contact = contact,
                    Date = reader.GetString(3),
                    Status = (ProjectStatus)status,
                    Description = reader.GetString(5),
                    IsDeleted = reader.GetBoolean(6)
                });
            }

            conn.Close();

            return projects;
        }

        private Project GetById(int projectId)
        {
            var conn = Connection.CreateConnection();

            SQLiteDataReader reader;
            SQLiteCommand command;

            command = conn.CreateCommand();
            command.CommandText = $"SELECT * FROM Project WHERE id = {projectId}";

            reader = command.ExecuteReader();

            var projects = new List<Project>();

            while (reader.Read())
            {
                var contact = JsonConvert.DeserializeObject<Employee>(
                        reader.GetString(2));
                var status = reader.GetInt32(4);
                projects.Add(new Project()
                {
                    Id = reader.GetInt32(0),
                    Name = reader.GetString(1),
                    Contact = contact,
                    Date = reader.GetString(3),
                    Status = (ProjectStatus)status,
                    Description = reader.GetString(5),
                    IsDeleted = reader.GetBoolean(6)
                });
            }

            conn.Close();

            return projects.SingleOrDefault();
        }

        public Project Add(Project project)
        {
            var conn = Connection.CreateConnection();

            SQLiteDataReader reader;
            SQLiteCommand command;

            command = conn.CreateCommand();
            command.CommandText = $"INSERT INTO Project (name, contact, date, status, description)" +
                $"VALUES ('{project.Name}', " +
                $"'{JsonConvert.SerializeObject(project.Contact)}', " +
                $"'{project.Date}', " +
                $"{(int)project.Status}, " +
                $"'{project.Description}')";

            Project result;
            try
            {
                command.ExecuteNonQuery();

                var lastInsertedRowId = (int)conn.LastInsertRowId;

                result = GetById(lastInsertedRowId);
            }
            catch (Exception e)
            {
                result = new Project();
            }

            conn.Close();

            return result;
        }

        public int Update(Project project)
        {
            var conn = Connection.CreateConnection();

            SQLiteDataReader reader;
            SQLiteCommand command;

            command = conn.CreateCommand();
            command.CommandText = $"UPDATE Project SET " +
                $"name = '{project.Name}'," +
                $"contact = '{JsonConvert.SerializeObject(project.Contact)}'," +
                $"date = '{project.Date}'," +
                $"status = {(int)project.Status}," +
                $"description = '{project.Description}' " +
                $"WHERE id = {project.Id};";

            int result;
            try
            {
                command.ExecuteNonQuery();

                result = project.Id;
            }
            catch (Exception e)
            {
                result = 0;
            }

            conn.Close();

            return result;
        }

        public bool Delete(int projectId)
        {
            var conn = Connection.CreateConnection();

            SQLiteDataReader reader;
            SQLiteCommand command;

            command = conn.CreateCommand();
            command.CommandText = $"UPDATE Project SET " +
                $"isDeleted = 1 " +
                $"WHERE id = {projectId};";

            int result;
            try
            {
                result = command.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                result = 0;
            }

            conn.Close();

            return result > 0;
        }
    }
}
