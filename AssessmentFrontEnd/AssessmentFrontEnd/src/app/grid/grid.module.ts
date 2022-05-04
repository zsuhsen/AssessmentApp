import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { GridComponent } from "./grid.component";

@NgModule({
  declarations: [
    GridComponent
  ],
  exports: [
    GridComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
  ],
  bootstrap: []
})
export class GridModule { }
