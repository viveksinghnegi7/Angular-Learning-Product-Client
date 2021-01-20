import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from "rxjs";
import { AuthServiceService } from "../services/auth-service.service"; 
import { environment } from "../../environments/environment";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private accountService: AuthServiceService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.accountService.userValue;
    const isLoggedIn = user && user.token;
    console.log("The requested url is "+req.url);
    const isApiUrl = req.url.startsWith(environment.baseUrl);
    if (isLoggedIn && isApiUrl) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`
        }
      });
    }
    return next.handle(req); 
  }
}
