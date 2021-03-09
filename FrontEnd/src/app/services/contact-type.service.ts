import { Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ReturnStatement } from '@angular/compiler';
import { Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ContactType } from '../models/contactType';

@Injectable({
  providedIn: 'root'
})
export class ContactTypeService {             //This service class has the method to fill the conctactTypes
                                              //options in the select component to create/edit a new user 

  readonly myAppUrl = 'https://localhost:44346/api/contacttypes/';


  constructor(private http: HttpClient) { }

  public getContactTypes(): Observable<ContactType[]> {

    return this.http.get<ContactType[]>(this.myAppUrl).pipe(
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
