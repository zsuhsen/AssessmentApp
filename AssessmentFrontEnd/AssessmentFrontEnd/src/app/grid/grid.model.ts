export interface IGridModel {
  idField: string,
  data: any[],
  columns: IGridColumnModel[]
}

export interface IGridColumnModel {
  header: string,
  field: string,
  valueGetter?: (obj) => string;
}
