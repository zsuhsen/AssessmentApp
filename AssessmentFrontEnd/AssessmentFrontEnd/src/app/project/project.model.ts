import { IEmployee } from "../employee/employee.model";

export interface IProject {
  id: number;
  name: string;
  contact: IEmployee;
  date: string;
  status: ProjectStatus;
  description: string;
  isDeleted: boolean;
}

export enum ProjectStatus {
  NotStarted = 0,
  InProgress = 1,
  Completed = 2
}
