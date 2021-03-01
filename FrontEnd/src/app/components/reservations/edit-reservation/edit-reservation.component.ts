import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactType } from 'src/app/models/contactType';
import { Reserv } from 'src/app/models/reserv';
import { User } from 'src/app/models/user';
import { ContactTypeService } from 'src/app/services/contact-type.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.css']
})
export class EditReservationComponent implements OnInit {

  bsValue: any;
  public newReservUserForm: FormGroup;
  reserv: any = '';
  user: any = '';
  public contactTypeArray: Array<ContactType>;
  public newReservUserBuilder: FormBuilder = new FormBuilder;
  url: any = '';
  id: any = '';
  contactname: any = '';
  id_reserv: any = '';
  voters: any = '';
  votings: any = '';

  constructor(private userservice: UserService, private reservationservice: ReservationService, private contact: ContactTypeService
    , private toastr: ToastrService, newReservUserBuilder: FormBuilder, private router: ActivatedRoute) {

    this.newReservUserForm = this.newReservUserBuilder.group({
      contactName: ['', [Validators.required, Validators.maxLength(8)]],
      contactTypeName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(11)]],
      birthDate: ['', [Validators.required]],
      reservationInfo: ''
    });
    this.contactTypeArray = new Array<ContactType>();
  }

  ngOnInit(): void {

    this.loadContactSelect();
    this.load();
  }

  loadContactSelect() {
    this.contactTypeArray.splice(0, this.contactTypeArray.length);
    this.contact.getContactTypes().subscribe(data => {
      data.forEach(element => {
        this.contactTypeArray.push(element);
      });
    });

  }
  load() {
    this.loadUser(this.router.snapshot.paramMap.get('name'));
    this.loadReserv(this.router.snapshot.paramMap.get('id'));

  }

  loadUser(contactName: any) {
    this.userservice.getUsersByContactName(contactName).subscribe(data => {
      this.newReservUserForm.controls.contactName.setValue(data.contactName.toString());
      this.newReservUserForm.controls.contactTypeName.setValue(data.contactTypeName.toString());
      this.newReservUserForm.controls.phoneNumber.setValue(new Number(data.phoneNumber));
      this.newReservUserForm.controls.birthDate.setValue(new Date(data.birthDate.toString()));
    });
  }

  loadReserv(id: any) {
    this.reservationservice.get_reservationById(id).subscribe(data => {
      console.log(data);
      this.id_reserv = data.iD_Reservation;
      this.voters = data.voters;
      this.votings = data.votings;
      this.newReservUserForm.controls.reservationInfo.setValue(data.reservationInfo);
    });
  }
  updateReservation(): void {
    this.update_user();
    this.update_reserv();
  }

  update_reserv(): void {
    const reserv: Reserv = {
      iD_Reservation: this.id_reserv,
      fecha_Reservacion: new Date(),
      contactName: this.newReservUserForm.get('contactName')?.value,
      reservationInfo: this.newReservUserForm.get('reservationInfo')?.value,
      voters: this.voters,
      votings: this.votings
    }
    this.reservationservice.update_reservation(reserv).subscribe(data => {
    });
  }

  update_user(): void {
    const user: User = {
      contactName: this.newReservUserForm.get('contactName')?.value,
      contactTypeName: this.newReservUserForm.get('contactTypeName')?.value,
      phoneNumber: this.newReservUserForm.get('phoneNumber')?.value,
      birthDate: this.newReservUserForm.get('birthDate')?.value
    }
    this.userservice.updateuser(user).subscribe(data => {
      this.toastr.success('Reservation Updated', 'The reservation was successfully updated');
    })
  }

}
