using DataAccess;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public interface IProjectBo
    {
        public IList<Project> Get();
        public Project Add(Project project);
        public int Update(Project project);
        public bool Delete(int projectId);
    }

    public class ProjectBo : IProjectBo
    {
        private readonly IProjectDa _projectDa;
        public ProjectBo(IProjectDa projectDa)
        {
            _projectDa = projectDa;
        }

        public IList<Project> Get()
        {
            return _projectDa.Get();
        }

        public Project Add(Project project)
        {
            return _projectDa.Add(project);
        }

        public int Update(Project project)
        {
            return _projectDa.Update(project);
        }

        public bool Delete(int projectId)
        {
            return _projectDa.Delete(projectId);
        }
    }
}
