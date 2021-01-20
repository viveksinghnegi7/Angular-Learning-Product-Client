import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { retry, catchError } from 'rxjs/operators';
import { environment } from "../../environments/environment";
import { map } from 'rxjs/operators'; 
import { AuthenticateUser } from "../models/AuthenticateUser";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private currentUserSubject: BehaviorSubject<AuthenticateUser>;
  public currentUser: Observable<AuthenticateUser>;
  constructor(private router: Router,private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<AuthenticateUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable(); 
  }

  public get userValue(): AuthenticateUser {
    return this.currentUserSubject.value;
  }
  // Http Headers
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  login(data): Observable<AuthenticateUser> {
    return this.httpClient.post<AuthenticateUser>(environment.baseUrl + 'users/authenticate', JSON.stringify(data), this.httpOptions)
      .pipe(map(user => { 
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }) );
  }
  register(data): Observable<AuthenticateUser> {
    return this.httpClient.post<AuthenticateUser>(environment.baseUrl + 'users/register', JSON.stringify(data), this.httpOptions);
  }
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/account/login']);
  }
}
