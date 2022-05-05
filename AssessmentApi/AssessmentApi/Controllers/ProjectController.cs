using Business;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace AssessmentApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectBo _projectBo;
        public ProjectController(IProjectBo projectBo)
        {
            _projectBo = projectBo;
        }

        [HttpGet("")]
        public IList<Project> Get()
        {
            return _projectBo.Get();
        }

        [HttpPost("")]
        public Project Add([FromBody] Project project)
        {
            return _projectBo.Add(project);
        }

        [HttpPut("")]
        public int Update([FromBody] Project project)
        {
            return _projectBo.Update(project);
        }

        [HttpDelete("{id}")]
        public bool Delete([FromRoute] int id)
        {
            return _projectBo.Delete(id);
        }
    }
}