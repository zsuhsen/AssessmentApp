using Business;
using Microsoft.AspNetCore.Mvc;

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
        public dynamic Get()
        {
            return _projectBo.GetProjects();
        }
    }
}