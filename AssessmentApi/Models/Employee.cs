using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? JobTitle { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Fax { get; set; }
        public string? Email { get; set; }
        public bool IsActive { get; set; }
    }
}
