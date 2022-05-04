import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from "@angular/core";
import { IGridModel } from "./grid.model";

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {
  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

  @Input() gridModel: IGridModel;
  @Output() onUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();

  selectedDetail: number;

  constructor() {

  }

  openDetail(model: any) {
    this.selectedDetail = this.selectedDetail !== model[this.gridModel.idField] ? model[this.gridModel.idField] : null;
  }

}
