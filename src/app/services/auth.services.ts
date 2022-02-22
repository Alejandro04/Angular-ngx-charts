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
  private url: string = "https://veterinaria-auth-demo.vercel.app"
  public token: any;
  private token$ = new BehaviorSubject<string>('');
  public isloggedIn: boolean = false;
  public isAdmin: boolean = false;

  constructor(
    private http: HttpClient, 
    private router: Router
    ) {
  }

  public saveToken(data: any): void {
    this.token = data;
    localStorage.setItem("token", data);
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
    if(user.email === 'admin@admin.com'){
      this.isAdmin = true;
    }
    return this.http.post(`${this.url}/api/login`, user).pipe(
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