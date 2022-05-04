import { EventEmitter } from "@angular/core";
import { Component, Input, OnInit, Output } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { first } from "rxjs";
import { IEmployee } from "../employee.model";
import { EmployeeService } from "../services/employee.service";

@Component({
  selector: 'employee-crud',
  templateUrl: './employee-crud.component.html',
  styleUrls: ['./employee-crud.component.css']
})
export class EmployeeCrudComponent implements OnInit {

  @Input() employee: IEmployee;
  @Output() save: EventEmitter<IEmployee> = new EventEmitter<IEmployee>();

  phoneNumberRegEx: RegExp = new RegExp(/^[0-9]{0,3}[-]\*{0,1}[0-9]{0,3}[-]\*{0,1}[0-9]{0,4}$/);
  emailRegEx: RegExp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

  employeeForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.required, this.phoneNumberValidator()]),
      email: new FormControl('', [Validators.required, this.emailValidator()])
    });
  }

  onSumbit() {
    const newEmployee: IEmployee = Object.assign({}, this.employee, this.employeeForm.value);
    console.log('newEmployee', newEmployee);
    this.save.emit(newEmployee);
  }

  phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const invalid = !this.phoneNumberRegEx.test(control.value);
      return invalid ? { invalid: { value: control.value } } : null;
    };
  }

  emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const invalid = !this.emailRegEx.test(control.value);
      return invalid ? { invalid: { value: control.value } } : null;
    };
  }
}
