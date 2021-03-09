import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Reserv } from '../models/reserv';
import { Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {           //This class has all the CRUD and sortings methods with a handle error method
                                            //if an error occurs

  readonly myAppUrl = 'https://localhost:44346/api/reservations/';


  constructor(private http: HttpClient) { }

  public save_reservation(reserv: Reserv): Observable<Reserv> {
    return this.http.post<Reserv>(this.myAppUrl, reserv);
  }

  public get_reservation(): Observable<Array<Reserv>> {
    return this.http.get<Array<Reserv>>(this.myAppUrl);
  }
  public get_reservationById(id: number): Observable<Reserv> {
    return this.http.get<Reserv>(this.myAppUrl + id);
  }

  public update_reservation(reserv: Reserv): Observable<Reserv> {
    return this.http.put<Reserv>(this.myAppUrl + reserv.idReservation, reserv).pipe(
      catchError(this.handleError)
    );
  }
  public get_asc_bydate(): Observable<Array<Reserv>> {
    return this.http.get<Array<Reserv>>(this.myAppUrl + 'ascendentbydate/').pipe(
      catchError(this.handleError)
    );
  }
  public get_desc_bydate(): Observable<Array<Reserv>> {
    return this.http.get<Array<Reserv>>(this.myAppUrl + 'descendentbydate/').pipe(
      catchError(this.handleError)
    );
  }
  public get_asc_byalphabetic(): Observable<Array<Reserv>> {
    return this.http.get<Array<Reserv>>(this.myAppUrl + 'alphabeticacs/').pipe(
      catchError(this.handleError)
    );
  }
  public get_desc_byalphabetic(): Observable<Array<Reserv>> {
    return this.http.get<Array<Reserv>>(this.myAppUrl + 'alphabeticdesc/').pipe(
      catchError(this.handleError)
    );
  }
  public get_by_ranking(): Observable<Array<Reserv>> {
    return this.http.get<Array<Reserv>>(this.myAppUrl + 'byranking/').pipe(
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
