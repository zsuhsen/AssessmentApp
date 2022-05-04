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
    public interface IProjectDa
    {
        public dynamic GetProjects();
    }

    public class ProjectDa : IProjectDa
    {
        public ProjectDa()
        {

        }

        public dynamic GetProjects()
        {
            var conn = Connection.CreateConnection();

            SQLiteDataReader reader;
            SQLiteCommand command;

            SQLiteCommand command1;

            command1 = conn.CreateCommand();
            command1.CommandText = "INSERT INTO Project (name, contact, date) VALUES " +
                "('Project 2', 'Zach Suhsen', datetime('now'));";

            command1.ExecuteNonQuery();

            command = conn.CreateCommand();
            command.CommandText = "SELECT * FROM Project";

            reader = command.ExecuteReader();

            var projects = new List<Project>();

            while (reader.Read())
            {
                projects.Add(new Project()
                {
                    Id = reader.GetInt32(0),
                    Name = reader.GetString(1),
                    Contact = reader.GetString(2),
                    Date = reader.GetString(3)
                });
            }

            conn.Close();

            return projects;
        }
    }
}
