import { Component, OnInit } from "@angular/core";
import { first } from "rxjs";
import { IEmployee } from "../employee/employee.model";
import { EmployeeService } from "../employee/services/employee.service";
import { IGridColumnModel, IGridModel } from "../grid/grid.model";
import { IProject, ProjectStatus } from "./project.model";
import { ProjectService } from "./services/project.service";

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  isLoaded: boolean = false;

  enableAddUpdate: boolean = false;
  projectToUpdate: IProject;

  selectedDetail: number;

  projects: IProject[];

  gridModel: IGridModel;
  employees: IEmployee[]

  constructor(private projectService: ProjectService,
    private employeeService: EmployeeService) {

  }

  ngOnInit() {
    this.projectService.getProjects().pipe(first()).subscribe((projects: IProject[]) => {
      this.projects = projects.filter(e => !e.isDeleted);
      this.buildGridModel();
      this.isLoaded = true;
    });
    this.employeeService.getEmployees().pipe(first()).subscribe((employees: IEmployee[]) => {
      this.employees = employees.filter(e => e.isActive);
    });
  }

  buildGridModel(): void {
    this.gridModel = {
      idField: 'id',
      columns: [
        <IGridColumnModel>{
          header: 'Name',
          field: 'name'
        },
        <IGridColumnModel>{
          header: 'Date',
          field: 'date'
        },
        <IGridColumnModel>{
          header: 'Contact',
          field: 'contact',
          valueGetter: (obj) => {
            return obj.name;
          }
        }
      ],
      data: this.projects
    }
  }

  getStatusLabel(status: ProjectStatus) {
    switch (status) {
      case ProjectStatus.NotStarted:
        return 'Not Started';
      case ProjectStatus.Completed:
        return 'Completed';
      case ProjectStatus.InProgress:
        return 'In Progress';
      default:
        return 'Unkown Status'
    }
  }

  onSave(project: IProject) {
    this.projectService.saveProject(project).pipe(first()).subscribe((result: IProject) => {
      if (result?.id > 0) {
        this.projects.push(result);
      } else {
        const updatedEmpIndex = this.projects.findIndex(e => e.id === project.id);
        this.projects.splice(updatedEmpIndex, 1, project);
      }


      this.projectToUpdate = null;
      this.enableAddUpdate = false;
    });
  }

  onAddUpdate(employee?: IProject) {
    if (employee) {
      this.projectToUpdate = employee;
    }
    this.enableAddUpdate = true;
  }

  onCloseAddUpdate() {
    this.projectToUpdate = null;
    this.enableAddUpdate = false;
  }

  onDelete(id: number) {
    this.projectService.deleteProject(id).pipe(first()).subscribe(result => {
      if (result) {
        const deletedEmpIndex = this.projects.findIndex(e => e.id === id);

        this.projects.splice(deletedEmpIndex, 1);
      }
    });
  }

}

