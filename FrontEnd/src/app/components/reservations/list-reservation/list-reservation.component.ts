import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, NgForm } from '@angular/forms';
import { isUndefined } from 'ngx-bootstrap/chronos/utils/type-checks';
import { Observable } from 'rxjs/internal/Observable';
import { Reserv } from 'src/app/models/reserv';
import { User } from 'src/app/models/user';
import { FavoriteService } from 'src/app/services/favorite.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.css']
})
export class ListReservationComponent implements OnInit {

  isFavArray: Array<number>;
  reservList: Array<Reserv>;
  public cantReserv: number;
  public selectedFilter: any;
  reserv: Reserv;
  pag:number = 1;


  constructor(public resevservice: ReservationService, public favoriteservice: FavoriteService) {
    this.reservList = new Array<Reserv>();
    this.isFavArray = new Array<number>();
    this.cantReserv = this.reservList.length;
    this.reserv = new Reserv('', new Date, '', 0, 1, 0);
  }

  ngOnInit() {

    this.resevservice.get_reservation().subscribe((data) => {
      this.reservList = data as Array<Reserv>;
    });
  }

  onfavorite(idreserv: any) {
    this.changeclass(idreserv);
    if(typeof(Storage) !== 'undefined')    
      this.favoriteservice.setlocalstorage(idreserv);
    
    
  }

  isfavorite(id: any): boolean {
    return this.favoriteservice.getlocalstorag(id);
  }

  changeclass(idreserv: number) {
    document.getElementById(idreserv.toString())?.classList.toggle('text-black-50');
  }

  filtrar(id: any): void {
    switch (id.target.value) {
      case 'By_Date_Ascending':
        this.resevservice.get_asc_bydate().subscribe(data => {
          this.reservList.splice(0, this.reservList.length);
          data.forEach(element => {
            this.reservList.push(element);
          });
          this.reservList = data;
        });
        break;
      case 'By_Date_Descending':
        this.resevservice.get_desc_bydate().subscribe(data => {
          this.reservList.splice(0, this.reservList.length);
          data.forEach(element => {
            this.reservList.push(element);
          });
          this.reservList = data;
        });
        break;
      case 'By_Alphabetic_Ascending':
        this.resevservice.get_asc_byalphabetic().subscribe(data => {
          this.reservList.splice(0, this.reservList.length);
          data.forEach(element => {
            this.reservList.push(element);
          });
          this.reservList = data;
        });
        break;
      case 'By_Alphabetic_Descending':
        this.resevservice.get_desc_byalphabetic().subscribe(data => {
          this.reservList.splice(0, this.reservList.length);
          data.forEach(element => {
            this.reservList.push(element);
          });
          this.reservList = data;
        });
        break;
      case 'By_Ranking':
        this.resevservice.get_by_ranking().subscribe(data => {
          this.reservList.splice(0, this.reservList.length);
          data.forEach(element => {
            this.reservList.push(element);
          });
          this.reservList = data;
        });
        break;
    }
  }

  vote(id: any, clasification: number): void {

    this.resevservice.get_reservationById(id).subscribe(data => {
      let info = data.reservationInfo;
      let date = data.reservationDate;

      if (data.votings == 0) {
        this.reserv = new Reserv(data.reservationInfo, data.reservationDate, data.contactName, clasification, 1, data.iD_Reservation);
        this.resevservice.update_reservation(this.reserv).subscribe(data => { });
      }
      else {
        this.reserv = new Reserv(data.reservationInfo, data.reservationDate, data.contactName, (clasification + data.votings), ++data.voters, data.iD_Reservation);
        this.resevservice.update_reservation(this.reserv).subscribe(data => { });
      }
    });
  }
  isyellow(id: any, place: number): boolean {
    let yellow: boolean = false;
    let idAsNumber: number = Number(id);
    this.reservList.forEach(element => {
      if (element.iD_Reservation === idAsNumber) {
        if (element.votings / element.voters >= place)
          yellow = true;
      }
    });
    return yellow;
  }
}

