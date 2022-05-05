using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Project
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public Employee? Contact { get; set; }
        public string? Date { get; set; }
        public ProjectStatus Status { get; set; }
        public string? Description { get; set; }
        public bool? IsDeleted { get; set; }

    }

    public enum ProjectStatus
    {
        NotStarted = 0,
        InProgress = 1,
        Completed = 2
    }
}
