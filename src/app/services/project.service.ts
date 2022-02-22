import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Subject } from 'rxjs';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  private url: any = environment.apiProjectUrl;
  private action = new Subject<string>();
  public actionObservable = this.action.asObservable();

  constructor(
    private http: HttpClient,
  ) {
  }

  executeAction(value: string) {
    this.action.next(value)
  }

  getAction(): Observable<any> {
    return this.action.asObservable();
  }

  public getProjects(): Observable<any> {
    return this.http.get<any[]>(
      `${this.url}/api/projects`
    );
  }

  public createProject(value: any): Observable<any> {
    return this.http.post<any>(`${this.url}/api/projects`, value);
  }
}