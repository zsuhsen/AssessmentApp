import { NgModule } from "@angular/core";
import { EmployeeModule } from "../employee/employee.module";
import { ProjectModule } from "../project/project.module";
import { WorkspaceComponent } from "./workspace.component";

@NgModule({
  declarations: [
    WorkspaceComponent
  ],
  exports: [
    WorkspaceComponent
  ],
  imports: [
    EmployeeModule,
    ProjectModule
  ],
  providers: [],
  bootstrap: [WorkspaceComponent]
})
export class WorkspaceModule { }
