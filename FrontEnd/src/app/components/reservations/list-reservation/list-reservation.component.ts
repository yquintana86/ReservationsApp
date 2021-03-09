import { Component, OnInit } from '@angular/core';
import { Reserv } from 'src/app/models/reserv';
import { FavoriteService } from 'src/app/services/favorite.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { ToastrService } from 'ngx-toastr';


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
  idReserv: any;
  reserv: Reserv;
  pag: number = 1;


  constructor(public resevservice: ReservationService, public favoriteservice: FavoriteService, private toastr: ToastrService) {
    this.reservList = new Array<Reserv>();
    this.isFavArray = new Array<number>();
    this.cantReserv = this.reservList.length;
    this.reserv = new Reserv('', new Date, '', 0, 1, 0);
  }

  ngOnInit() {

    try {
      this.resevservice.get_reservation().subscribe((data) => {
        this.reservList = data as Array<Reserv>;
      });
    }
    catch (e) {
      this.toastr.error(e.message);
    }
  }

  onfavorite(idreserv: any) {
    this.changeclass(idreserv);
    if (typeof (Storage) !== 'undefined')
      this.favoriteservice.setlocalstorage(idreserv);


  }

  isfavorite(id: any): boolean {
    return this.favoriteservice.getlocalstorage(id);
  }

  changeclass(idreserv: number) {
    document.getElementById(idreserv.toString())?.classList.toggle('text-black-50');
  }

  filtrar(id: any): void {
    try {
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
    catch (e) {
      this.toastr.error(e.message);
    }
  }

  vote(id: any, clasification: number): void {

    try {
      this.resevservice.get_reservationById(id).subscribe(data => {
        let info = data.reservationInfo;
        let date = data.reservationDate;

        if (data.votings == 0) {
          this.reserv = new Reserv(data.reservationInfo, data.reservationDate, data.contactName, clasification, 1, data.idReservation);
          this.resevservice.update_reservation(this.reserv).subscribe(data => { });
        }
        else {
          this.reserv = new Reserv(data.reservationInfo, data.reservationDate, data.contactName, (clasification + data.votings), ++data.voters, data.idReservation);
          this.resevservice.update_reservation(this.reserv).subscribe(data => { });
        }
      });
    }
    catch (e) {
      this.toastr.error(e.message);
    }
  }
  isyellow(id: any, place: number): boolean {
    let yellow: boolean = false;
    let idAsNumber: number = Number(id);
    this.reservList.forEach(element => {
      if (element.idReservation === idAsNumber) {
        if (element.votings / element.voters - 1 < place)
          yellow = true;
      }
    });
    return yellow;
  }
}

