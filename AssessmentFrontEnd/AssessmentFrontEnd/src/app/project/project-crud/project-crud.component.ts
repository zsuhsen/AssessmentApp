import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { IEmployee } from "../../employee/employee.model";
import { EmployeeService } from "../../employee/services/employee.service";
import { IProject, ProjectStatus } from "../project.model";

@Component({
  selector: 'project-crud',
  templateUrl: './project-crud.component.html',
  styleUrls: ['./project-crud.component.css']
})
export class ProjectCrudComponent implements OnInit, OnChanges {
  @Input() project: IProject;
  @Input() employees: IEmployee[];
  @Output() save: EventEmitter<IProject> = new EventEmitter<IProject>();

  private dateRegEx: RegExp = new RegExp(/^(0[1-9]|1[0-2])[/]\*{0,1}(([0]?[1-9])|([1-2][0-9])|(3[01]))[/]\*{0,1}[0-9]{4}$/);

  projectForm: FormGroup;

  statusOptions;

  constructor(private formBuilder: FormBuilder) {
    
  }

  ngOnInit() {
    this.setStatusOptions();
    this.setForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['project'].firstChange && changes['project'].currentValue) {
      this.setForm();
    }
  }

  setForm() {
    this.projectForm = this.formBuilder.group({
      name: new FormControl(this.project?.name, Validators.required),
      date: new FormControl(this.project?.date, [Validators.required, this.dateValidator()]),
      status: new FormControl(this.project?.status ? this.project.status : ProjectStatus.NotStarted),
      contact: new FormControl(this.getContactOption(), Validators.required),
      description: new FormControl(this.project?.description, [Validators.required, Validators.maxLength(100)])
    });
  }

  getContactOption(): any {
    if (this.project?.contact) {
      return this.employees.find(e => e.id === this.project.contact.id);
    }
    return null
  }

  onSumbit() {
    if (this.projectForm.valid) {
      const newproject: IProject = Object.assign({}, this.project, this.projectForm.value);
      this.save.emit(newproject);
    } else {
      this.projectForm.markAllAsTouched();
    }
  }

  setStatusOptions() {
    this.statusOptions = [
      { value: ProjectStatus.NotStarted, label: 'Not Started' },
      { value: ProjectStatus.InProgress, label: 'In Progress' },
      { value: ProjectStatus.Completed, label: 'Completed' }
    ];
  }

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const invalid = !this.dateRegEx.test(control.value);
      return invalid ? { invalid: { value: control.value } } : null;
    };
  }
}
