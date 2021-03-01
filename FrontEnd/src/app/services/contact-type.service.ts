import { Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ReturnStatement } from '@angular/compiler';
import { Observable } from 'rxjs';
import { observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ContactType } from '../models/contactType';

@Injectable({
  providedIn: 'root'
})
export class ContactTypeService {

  myAppUrl = 'https://localhost:44346/';
  myUsrApi = 'api/contacttypes/';

  constructor(private http: HttpClient) { }

  public getContactTypes(): Observable<ContactType[]> {

    return this.http.get<ContactType[]>(this.myAppUrl + this.myUsrApi);   
  }

}
