import { Injectable } from "@angular/core";
import { AuthenticationService } from "../services/auth.services";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaders,
  HttpEvent
} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthenticationService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();
    if (!token) {
      return next.handle(req);
    }
    const headers = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next.handle(headers);
  }
}
