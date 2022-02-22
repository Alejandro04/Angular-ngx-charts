import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs"; 
import { Router } from "@angular/router";
import { User } from "../models/user.model";
import { environment } from "../../environments/environment";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private url: string = "dummyurl"
  public token: any;
  private token$ = new BehaviorSubject<string>('');
  public isloggedIn: boolean = false;

  constructor(
    private http: HttpClient, 
    private router: Router
    ) {
  }

  public saveToken(data: any): void {
    this.token = data.access_token;
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("name", data.user.name);
    localStorage.setItem("user_id", data.user.id )
  }

  public getTokenUser(): any {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      return getToken;
    }
    return false;
  }

  public logout(user_id:any): void {
    localStorage.removeItem("token");
    localStorage.removeItem('name');

    this.router.navigateByUrl("/login");
    this.http
      .put(`${this.url}/api/auth/logout`, { user_id })
      .subscribe((data) => {});
  }

  public login(user: User): Observable<any> {
    return this.http.post(`${this.url}/api/auth/login`, user).pipe(
      map((data: any) => {
        this.isloggedIn = true;
        this.saveToken(data);
        return data;
      })
    );
  }

  public getToken(): string {
    if (!this.token && localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.token$.next(this.token);
    }
    return this.token;
  }
}