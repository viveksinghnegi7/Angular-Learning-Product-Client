import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError ,of} from "rxjs";
import { map, catchError, tap,retry } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { Users } from "../models/Users"; 
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  form: FormGroup = new FormGroup({
    userId: new FormControl(0),
    email: new FormControl('', Validators.email), 
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),

    //mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    //city: new FormControl(''),
    //gender: new FormControl('1'),
    //department: new FormControl(0),
    //hireDate: new FormControl(''),
    //isPermanent: new FormControl(false)
  }); 
  initializeFormGroup() {
    this.form.setValue({
      userId: 0,
      email: '',
      firstName: '',
      lastName: '' 
    });
  }
  populateForm(user) {
    this.form.setValue(_.omit(user, 'password', 'passwordHash','passwordSalt'));
  }
  getAllUsers(): Observable<Users[]> {
    return this.httpClient.get<Users[]>(environment.baseUrl + 'users/list', this.httpOptions); 
  }

  refresh() {
    return this.httpClient.get<Users[]>(environment.baseUrl + 'users/list', this.httpOptions); 
  }
  
  /** POST: add a new user to the server */
  insertUser(user: Users): Observable<any> {
    var url = `${environment.baseUrl}users/create`;
    console.log(url + JSON.stringify(user));
    return this.httpClient.post<any>(url, JSON.stringify(user), this.httpOptions).pipe(
      tap((newUser: any) => this.log(`added user w/ id=${newUser.userId}`)),
      catchError(this.handleError<any>('addUser'))
    );
  }

  /** PUT: update the user on the server */
  updateUser(user: Users): Observable<any> {
    console.log("updating...");
    var url = `${environment.baseUrl}users/update`;
    console.log(url);
    console.log(JSON.stringify(user));
    return this.httpClient.put(url, JSON.stringify(user), this.httpOptions).pipe(
      tap(_ => this.log(`updated user id=${user.userId}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }
   
  // DELETE
  deleteUser(id: any){
    console.log("in");
    return this.httpClient.delete<any>(`${environment.baseUrl}users/delete/${id}`, this.httpOptions);
  }

   
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    //this.messageService.add(`HeroService: ${message}`);
  }
}
