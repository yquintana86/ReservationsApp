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

  isfav_array: Array<number>;
  reservlist: Array<Reserv>;
  public id_reserv: any;
  public cant_reserv: number;
  public id = 0;
  public selectedFilter: any;


  constructor(public resevservice: ReservationService, public favoriteservice: FavoriteService) {
    this.reservlist = new Array<Reserv>();
    this.isfav_array = new Array<number>();
    this.cant_reserv = this.reservlist.length;
  }

  ngOnInit() {

    this.resevservice.get_reservation().subscribe((data) => {
      this.reservlist = data as Array<Reserv>;
    });
    this.favoriteservice.getcookie();

  }

  onfavorite(idreserv: any) {
    this.changeclass(idreserv);
    this.favoriteservice.setcookie(idreserv);
  }

  isfavorite(id: any): boolean {
    let is_fav = true;
    let fav = this.favoriteservice.favorite;
    if (fav != null) {
      if (fav.length > 0 && fav.includes(id.toString()))
        is_fav = false;
    }
    return is_fav;
  }

  changeclass(idreserv: number) {
    document.getElementById(idreserv.toString())?.classList.toggle('text-black-50');
  }

  filtrar(id: any): void {
    switch (id.target.value) {
      case 'By_Date_Ascending':
        this.resevservice.get_asc_bydate().subscribe(data => {
          this.reservlist.splice(0, this.reservlist.length);
          data.forEach(element => {
            this.reservlist.push(element);
          });
          this.reservlist = data;
        });
        break;
      case 'By_Date_Descending':
        this.resevservice.get_desc_bydate().subscribe(data => {
          this.reservlist.splice(0, this.reservlist.length);
          data.forEach(element => {
            this.reservlist.push(element);
          });
          this.reservlist = data;
        });
        break;
      case 'By_Alphabetic_Ascending':
        this.resevservice.get_asc_byalphabetic().subscribe(data => {
          this.reservlist.splice(0, this.reservlist.length);
          data.forEach(element => {
            this.reservlist.push(element);
          });
          this.reservlist = data;
        });
        break;
      case 'By_Alphabetic_Descending':
        this.resevservice.get_desc_byalphabetic().subscribe(data => {
          this.reservlist.splice(0, this.reservlist.length);
          data.forEach(element => {
            this.reservlist.push(element);
          });
          this.reservlist = data;
        });
        break;
      case 'By_Ranking':
        this.resevservice.get_by_ranking().subscribe(data => {
          this.reservlist.splice(0, this.reservlist.length);
          data.forEach(element => {
            this.reservlist.push(element);
          });
          this.reservlist = data;
        });
        break;
    }
  }

}

