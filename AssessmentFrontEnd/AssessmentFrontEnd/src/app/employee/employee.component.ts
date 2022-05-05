import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { first } from "rxjs/operators";
import { IGridColumnModel, IGridModel } from "../grid/grid.model";
import { IEmployee } from "./employee.model";
import { EmployeeService } from "./services/employee.service";

@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  isLoaded: boolean = false;

  enableAddUpdate: boolean = false;
  employeeToUpdate: IEmployee;

  selectedDetail: number;

  employees: IEmployee[];

  gridModel: IGridModel;

  constructor(private employeeService: EmployeeService) {

  }

  ngOnInit() {
    this.employeeService.getEmployees().pipe(first()).subscribe(employees => {
      this.employees = employees.filter(e => e.isActive);
      this.buildGridModel();
      this.isLoaded = true;
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
          header: 'Phone Number',
          field: 'phoneNumber'
        },
        <IGridColumnModel>{
          header: 'Email',
          field: 'email'
        }
      ],
      data: this.employees
    }
  }

  onSave(employee: IEmployee) {
    this.employeeService.saveEmployee(employee).pipe(first()).subscribe((result: IEmployee) => {
      if (result?.id > 0) {
        this.employees.push(result);
      } else {
        const updatedEmpIndex = this.employees.findIndex(e => e.id === employee.id);
        this.employees.splice(updatedEmpIndex, 1, employee);
      }

      this.employeeToUpdate = null;
      this.enableAddUpdate = false;
    });
  }

  onAddUpdate(employee?: IEmployee) {
    if (employee) {
      this.employeeToUpdate = employee;
    }
    this.enableAddUpdate = true;
  }

  onCloseAddUpdate() {
    this.employeeToUpdate = null;
    this.enableAddUpdate = false;
  }

  onDelete(id: number) {
    this.employeeService.deleteEmployee(id).pipe(first()).subscribe(result => {
      if (result) {
        const deletedEmpIndex = this.employees.findIndex(e => e.id === id);

        this.employees.splice(deletedEmpIndex, 1);
      }
    });
  }

}
