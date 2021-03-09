import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';



@Injectable({
  providedIn: 'root'
})
export class UserService {               //This class has all the CRUD methods with a handle error method
                                          //if an error occurs 
 readonly myAppUrl = 'https://localhost:44346/api/user/';       
  
  constructor(private http: HttpClient) { }

  saveUser(user: User): Observable<User> {
    return this.http.post<User>(this.myAppUrl, user).pipe(
      catchError(this.handleError)
    );
  }

  getusers(): Observable<User[]> {
    return this.http.get<User[]>(this.myAppUrl).pipe(
      catchError(this.handleError)
    );    
  }

  getUsersByContactName(contactName:string): Observable<User> {
    return this.http.get<User>(this.myAppUrl + contactName).pipe(
      catchError(this.handleError)
    );        
  }

  updateuser(user: User): Observable<User> {
    return this.http.put<User>(this.myAppUrl + user.contactName, user).pipe(
      catchError(this.handleError)
    );    
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {            
      console.error('An error occurred:', error.error.message);
    } else {     
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }    
    return throwError(
      'Something bad happened; please try again later.');
  }
 
}
