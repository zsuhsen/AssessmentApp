using DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public interface IProjectBo
    {
        public dynamic GetProjects();
    }

    public class ProjectBo : IProjectBo
    {
        private readonly IProjectDa _projectDa;
        public ProjectBo(IProjectDa projectDa)
        {
            _projectDa = projectDa;
        }

        public dynamic GetProjects()
        {
            return _projectDa.GetProjects();
        }
    }
}
