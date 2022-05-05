import { EventEmitter, OnDestroy } from "@angular/core";
import { Component, Input, OnInit, Output } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { IEmployee } from "../employee.model";

@Component({
  selector: 'employee-crud',
  templateUrl: './employee-crud.component.html',
  styleUrls: ['./employee-crud.component.css']
})
export class EmployeeCrudComponent implements OnInit {

  @Input() employee: IEmployee;
  @Output() save: EventEmitter<IEmployee> = new EventEmitter<IEmployee>();

  private phoneNumberRegEx: RegExp = new RegExp(/^[0-9]{3}[-]\*{0,1}[0-9]{3}[-]\*{0,1}[0-9]{4}$/);
  private emailRegEx: RegExp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

  employeeForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      name: new FormControl(this.employee ? this.employee.name : '', Validators.required),
      jobTitle: new FormControl(this.employee ? this.employee.jobTitle : '', Validators.required),
      phoneNumber: new FormControl(this.employee ? this.employee.phoneNumber : '', [Validators.required, this.phoneNumberValidator()]),
      fax: new FormControl(this.employee ? this.employee.fax : '', [Validators.required, this.phoneNumberValidator()]),
      email: new FormControl(this.employee ? this.employee.email : '', [Validators.required, this.emailValidator()])
    });
  }

  onSumbit() {
    if (this.employeeForm.valid) {
      const newEmployee: IEmployee = Object.assign({}, this.employee, this.employeeForm.value);
      this.save.emit(newEmployee);
    } else {
      this.employeeForm.markAllAsTouched();
    }
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
