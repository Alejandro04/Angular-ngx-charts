import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class ChartService {
  private url: string = "https://ddp-challenge.azurewebsites.net";
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

  public getData(): Observable<any> {
    return this.http.get<any[]>(
      `${this.url}/api/data`
    );
  }
}