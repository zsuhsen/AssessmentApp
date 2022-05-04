import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { first } from "rxjs/operators";
import { IEmployee } from "./employee.model";
import { EmployeeService } from "./services/employee.service";

@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  isLoaded: boolean = false;

  employees: IEmployee[];

  constructor(private employeeService: EmployeeService) {

  }

  ngOnInit() {
    this.employeeService.getEmployees().pipe(first()).subscribe(employees => {
      
      this.employees = employees;
      this.isLoaded = true;
    });
  }

  onSave(employee: IEmployee) {
    this.employeeService.saveEmployee(employee).pipe(first()).subscribe((result: IEmployee) => {
      console.log({ result });
      if (result.id > 0) {
        this.employees.push(employee);
      }
    });
  }

  onUpdate(employee: any) {
    console.log('employee delete', employee);
  }

  onDelete(employee: IEmployee) {
    this.employeeService.deleteEmployee(employee.id).pipe(first()).subscribe(result => {
      console.log({ result });
      if (result) {
        const deletedEmpIndex = this.employees.findIndex(e => e.id === employee.id);

        this.employees.splice(deletedEmpIndex, 1);
      }
    });
  }

}
