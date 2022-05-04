using Business;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace AssessmentApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeBo _employeeBo;
        public EmployeeController(IEmployeeBo employeeBo)
        {
            _employeeBo = employeeBo;
        }

        [HttpGet("")]
        public IList<Employee> Get()
        {
            return _employeeBo.Get();
        }

        [HttpPost("")]
        public Employee Add([FromBody] Employee employee)
        {
            return _employeeBo.Add(employee);
        }

        [HttpPut("")]
        public int Update([FromBody] Employee employee)
        {
            return _employeeBo.Update(employee);
        }

        [HttpDelete("{id}")]
        public bool Delete([FromRoute] int id)
        {
            return _employeeBo.Delete(id);
        }
    }
}