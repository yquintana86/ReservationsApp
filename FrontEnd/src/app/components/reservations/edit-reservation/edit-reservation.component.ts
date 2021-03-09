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
  public contactTypeArray: Array<ContactType>;
  public newReservUserBuilder: FormBuilder = new FormBuilder;
  idReserv: any = '';
  voters: any = '';
  votings: any = '';
  public minDate: Date;
  public maxDate: Date;

  constructor(private userservice: UserService, private reservationservice: ReservationService, private contact: ContactTypeService
    , private toastr: ToastrService, newReservUserBuilder: FormBuilder, private router: ActivatedRoute) {

    //Initialize the FormGroup with all the values of the components and its validations
    this.newReservUserForm = this.newReservUserBuilder.group({
      contactName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(8), Validators.pattern("[A-Za-z0-9_-]{1,8}")]],
      contactTypeName: ['', [Validators.required]],
      phoneNumber: '',
      birthDate: [new Date(), [Validators.required]],
      reservationInfo: ''
    });
    this.contactTypeArray = new Array<ContactType>();

    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 54750);
  }

  ngOnInit(): void {

    this.loadContactSelect();
    this.load();
  }

  loadContactSelect() {                   //Fill all the contactTypes options on the select component
    try {
      this.contactTypeArray.splice(0, this.contactTypeArray.length);
      this.contact.getContactTypes().subscribe(data => {
        data.forEach(element => {
          this.contactTypeArray.push(element);
        });
      });
    }
    catch (e) {
      this.toastr.error(e.message);
    }

  }
  load() {
    this.loadUser(this.router.snapshot.paramMap.get('name'));
    this.loadReserv(this.router.snapshot.paramMap.get('id'));
  }

  loadUser(contactName: any) {                  //Fill the contact type, phone number and birthdate of the user
    try {
      this.userservice.getUsersByContactName(contactName).subscribe(data => {
        this.newReservUserForm.controls.contactName.setValue(data.contactName.toString());
        this.newReservUserForm.controls.contactTypeName.setValue(data.contactTypeName.toString());
        this.newReservUserForm.controls.phoneNumber.setValue(data.phoneNumber);
        this.newReservUserForm.controls.birthDate.setValue(new Date(data.birthDate.toString()));
      });
    }
    catch (e) {
      this.toastr.error(e.message);
    }
  }

  loadReserv(id: any) {                         //Fill the text editor with the info 
    try {
      this.reservationservice.get_reservationById(id).subscribe(data => {
        console.log(data);
        this.idReserv = data.idReservation;
        this.voters = data.voters;
        this.votings = data.votings;
        this.newReservUserForm.controls.reservationInfo.setValue(data.reservationInfo);
      });
    }
    catch (e) {
      this.toastr.error(e);
    }
  }
  updateReservation(): void {
    this.update_user();
    this.update_reserv();
  }

  update_reserv(): void {             //Update the reservation 
    const reserv: Reserv = {
      idReservation: this.idReserv,
      reservationDate: new Date(),
      contactName: this.newReservUserForm.get('contactName')?.value,
      reservationInfo: (this.newReservUserForm.get('reservationInfo')?.value == '') ? '<p> </p>'
        : this.newReservUserForm.get('reservationInfo')?.value,
      voters: this.voters,
      votings: this.votings
    }
    try {
      this.reservationservice.update_reservation(reserv).subscribe(data => {
        this.toastr.success('Reservation Updated', 'The reservation was successfully updated');
      });
    }
    catch (e) {
      this.toastr.error(e.message);
    }
  }

  update_user(): void {                       //Update the user 
    const user: User = {
      contactName: this.newReservUserForm.get('contactName')?.value,
      contactTypeName: this.newReservUserForm.get('contactTypeName')?.value,
      phoneNumber: (this.newReservUserForm.get('phoneNumber')?.value) ?? '',
      birthDate: this.newReservUserForm.get('birthDate')?.value
    }
    try {
      this.userservice.updateuser(user).subscribe(data => { });
    }
    catch (e) {
      this.toastr.error(e.message);
    }
  }

  preventNonNumericalInput(e: any): void {                         //Prevent users type non numbers in Firefox 
    e = e || window.event;
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);
    if (!charStr.match(/^[0-9]+$/))
      e.preventDefault();
    else {
      if (!this.newReservUserForm.get('phoneNumber')?.value)
        return;
      else
        if (this.newReservUserForm.get('phoneNumber')?.value.toString().length > 10)
          e.preventDefault();
    }
  }

}
