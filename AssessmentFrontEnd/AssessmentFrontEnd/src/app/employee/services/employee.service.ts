import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IEmployee } from "../employee.model";

@Injectable()
export class EmployeeService {

  url: string = "https://localhost:7267/Employee";

  constructor(private httpClient: HttpClient) {
    
  }

  getEmployees(): Observable<IEmployee[]> {
    return this.httpClient.get<IEmployee[]>(this.url);
  }

  saveEmployee(employee: IEmployee): Observable<number | IEmployee> {
    if (employee.id) {
      return this.httpClient.put<number>(this.url, employee);
    } else {
      return this.httpClient.post<IEmployee>(this.url, employee);
    }
  }

  deleteEmployee(employeeId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.url + '/' + employeeId);
  }
}
