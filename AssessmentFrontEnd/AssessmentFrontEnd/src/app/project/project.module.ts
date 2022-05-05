import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { GridModule } from "../grid/grid.module";
import { ProjectCrudComponent } from "./project-crud/project-crud.component";
import { ProjectComponent } from "./project.component";
import { ProjectService } from "./services/project.service";

@NgModule({
  declarations: [
    ProjectComponent,
    ProjectCrudComponent
  ],
  exports: [
    ProjectComponent,
    ProjectCrudComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GridModule
  ],
  providers: [
    ProjectService
  ],
  bootstrap: []
})
export class ProjectModule { }
