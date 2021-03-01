import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Reserv } from '../models/reserv';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  
  myAppUrl = 'https://localhost:44346/api/reservations/';   
 

  constructor(private http:HttpClient ) {
    
   }


 public save_reservation(reserv:Reserv):Observable<Reserv>
 {
    return this.http.post<Reserv>(this.myAppUrl,reserv);   
 }

public get_reservation():Observable<Array<Reserv>>
{
  return this.http.get<Array<Reserv>>(this.myAppUrl);
}
public get_reservationById(id: number):Observable<Reserv>
{
  return this.http.get<Reserv>(this.myAppUrl + id);
}

public update_reservation(reserv: Reserv):Observable<Reserv>
{
  return this.http.put<Reserv>(this.myAppUrl + reserv.iD_Reservation,reserv); 
} 
public get_asc_bydate():Observable<Array<Reserv>>
{
  return this.http.get<Array<Reserv>>(this.myAppUrl + 'ascendentbydate/')   
}
public get_desc_bydate():Observable<Array<Reserv>>
{
  return this.http.get<Array<Reserv>>(this.myAppUrl + 'descendentbydate/')   
}
public get_asc_byalphabetic():Observable<Array<Reserv>>
{
  return this.http.get<Array<Reserv>>(this.myAppUrl + 'alphabeticacs/')   
}
public get_desc_byalphabetic():Observable<Array<Reserv>>
{
  return this.http.get<Array<Reserv>>(this.myAppUrl + 'alphabeticdesc/')   
}
public get_by_ranking():Observable<Array<Reserv>>
{
  return this.http.get<Array<Reserv>>(this.myAppUrl + 'byranking/')   
}
}
