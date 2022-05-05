using DataAccess;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public interface IEmployeeBo
    {
        public IList<Employee> Get();
        public Employee GetById(int employeeId);
        public Employee Add(Employee employee);
        public int Update(Employee employee);
        public bool Delete(int employeeId);
    }

    public class EmployeeBo : IEmployeeBo
    {
        private readonly IEmployeeDa _employeeDa;

        public EmployeeBo(IEmployeeDa employeeDa)
        {
            _employeeDa = employeeDa;
        }

        public IList<Employee> Get()
        {
            return _employeeDa.Get();
        }

        public Employee GetById(int employeeId)
        {
            return _employeeDa.GetById(employeeId);
        }

        public Employee Add(Employee employee)
        {
            return _employeeDa.Add(employee);
        }

        public int Update(Employee employee)
        {
            return _employeeDa.Update(employee);
        }

        public bool Delete(int employeeId)
        {
            return _employeeDa.Delete(employeeId);
        }
    }
}
