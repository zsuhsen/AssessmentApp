import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { GridModule } from "../grid/grid.module";
import { EmployeeCrudComponent } from "./employee-crud/employee-crud.component";
import { EmployeeComponent } from "./employee.component";
import { EmployeeService } from "./services/employee.service";

@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeeCrudComponent
  ],
  exports: [
    EmployeeComponent,
    EmployeeCrudComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GridModule
  ],
  providers: [
    EmployeeService
  ],
  bootstrap: []
})
export class EmployeeModule { }
