import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  myAppUrl = 'https://localhost:44346/api/user/';
  
  constructor(private http: HttpClient) {
  }

  saveUser(user: User): Observable<User> {
    return this.http.post<User>(this.myAppUrl, user);
  }

  getusers(): Observable<User[]> {
    return this.http.get<User[]>(this.myAppUrl);    
  }

  getUsersByContactName(contactName:string): Observable<User> {
    return this.http.get<User>(this.myAppUrl + contactName);    
  }

  updateuser(user: User): Observable<User> {
    return this.http.put<User>(this.myAppUrl + user.contactName, user);
  }
  

 
}
