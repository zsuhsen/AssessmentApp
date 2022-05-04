import { NgModule } from "@angular/core";
import { EmployeeModule } from "../employee/employee.module";
import { WorkspaceComponent } from "./workspace.component";

@NgModule({
  declarations: [
    WorkspaceComponent
  ],
  exports: [
    WorkspaceComponent
  ],
  imports: [
    EmployeeModule
  ],
  providers: [],
  bootstrap: [WorkspaceComponent]
})
export class WorkspaceModule { }
