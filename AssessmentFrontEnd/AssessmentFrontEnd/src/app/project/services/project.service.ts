import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IProject } from "../project.model";

@Injectable()
export class ProjectService {
  url: string = "https://localhost:7267/Project";

  constructor(private httpClient: HttpClient) {

  }

  getProjects(): Observable<IProject[]> {
    return this.httpClient.get<IProject[]>(this.url);
  }

  saveProject(project: IProject): Observable<number | IProject> {
    if (project.id) {
      return this.httpClient.put<number>(this.url, project);
    } else {
      return this.httpClient.post<IProject>(this.url, project);
    }
  }

  deleteProject(projectId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.url + '/' + projectId);
  }
}
