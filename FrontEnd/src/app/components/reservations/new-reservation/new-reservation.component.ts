import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl, NgForm, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { Reserv } from 'src/app/models/reserv';
import { ContactType } from 'src/app/models/contactType';
import { ContactTypeService } from 'src/app/services/contact-type.service';
import { stringify } from '@angular/compiler/src/util';
import { isPartiallyEmittedExpression } from 'typescript';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.css']
})

export class NewReservationComponent implements OnInit {

  public bsValue = new Date();
  public newReservUserForm: FormGroup;
  public contactTypeArray: Array<ContactType>;
  public newReservUserBuilder: FormBuilder = new FormBuilder;
  public minDate: Date;
  public maxDate: Date;

  constructor(private userservice: UserService, private reservationservice: ReservationService, private contact: ContactTypeService
    , private toastr: ToastrService, newReservUserBuilder: FormBuilder) {

      //Initialize the FormGroup with all the values of the components and its validations
    this.newReservUserForm = this.newReservUserBuilder.group({
      contactName: ['', [Validators.required, Validators.maxLength(8), Validators.pattern("[A-Za-z0-9_-]{1,8}")]],
      contactTypeName: ['', [Validators.required]],
      phoneNumber: '',
      birthDate: ['', [Validators.required]],
      reservationInfo: ''
    });
    
    this.contactTypeArray = new Array<ContactType>();

    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 54750);
  }

  ngOnInit(): void {

    this.loadContactSelect();
  }

  loadContactSelect() {                     //Fill all the contactTypes options on the select component 
    try{
      this.contactTypeArray.splice(0, this.contactTypeArray.length);
      this.contact.getContactTypes().subscribe(data => {
        data.forEach(element => {
          this.contactTypeArray.push(element);
        });
      });
    }
    catch(e)
    {
      this.toastr.error(e.message);
    }
  }

saveReservation(): void {         // Choose between update a user with a new reservation or save a new user and its reservation 

    this.userservice.getUsersByContactName(this.newReservUserForm.get('contactName')?.value).subscribe(data => {
      if (data) {
        this.update_user();
        this.save_reserv();
      }
      else {
        this.save_user();
        this.save_reserv();
      }
    });
  }

  save_reserv(): void {                   //Save a reservation
    const reserv: Reserv = {
      reservationDate: new Date(),
      contactName: this.newReservUserForm.get('contactName')?.value,
      reservationInfo: this.newReservUserForm.get('reservationInfo')?.value,
      voters: 1,
      votings: 0
    }
    try{
      this.reservationservice.save_reservation(reserv).subscribe(data => {});
      this.newReservUserForm.reset();
    }
    catch(e)
    {
      this.toastr.error(e.message);
    }
  }

  save_user(): void {                                                  //Save User                 
    const user: User = {
      contactName: this.newReservUserForm.get('contactName')?.value,
      contactTypeName: this.newReservUserForm.get('contactTypeName')?.value,      
      phoneNumber: this.newReservUserForm.get('phoneNumber')?.value,
      birthDate: this.newReservUserForm.get('birthDate')?.value
    }
    try{
      this.userservice.saveUser(user).subscribe(data => {
        this.toastr.success('Reservation Saved', 'The reservation was successfully saved');
      })
    }
    catch(e)
    {
      this.toastr.error(e.message);
    }
  }

  update_user(): void {                   //Update User
    const user: User = {
      contactName: this.newReservUserForm.get('contactName')?.value,
      contactTypeName: this.newReservUserForm.get('contactTypeName')?.value,
      phoneNumber: this.newReservUserForm.get('phoneNumber')?.value,
      birthDate: this.newReservUserForm.get('birthDate')?.value
    }
    try{
      this.userservice.updateuser(user).subscribe(data => {
        this.toastr.success('Reservation Saved', 'The reservation was successfully saved');
      })
    }
    catch(e)
    {
      this.toastr.error(e.message);
    }
  }

  public checkExistency() {     //Auto fill the contact type, phone number and birthdate
    try
    {
      let conctact: string = this.newReservUserForm.get('contactName')?.value;
    if (conctact.length > 3) {
      this.userservice.getUsersByContactName(conctact).subscribe(data => {
        if (data) {
          this.newReservUserForm.controls.contactTypeName.setValue(data.contactTypeName.toString());
          this.newReservUserForm.controls.phoneNumber.setValue(data.phoneNumber);
          this.newReservUserForm.controls.birthDate.setValue(new Date(data.birthDate.toString()));
        }
        else {
          this.newReservUserForm.controls.phoneNumber.setValue('');
          this.newReservUserForm.controls.birthDate.setValue(new Date());
        }
      });     
    }    
    }
    catch(e)
    {
      this.toastr.error(e.message);
    }
    }

     preventNonNumericalInput(e:any):void {                         //Prevent users type non numbers in Firefox 
      e = e || window.event;
      var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
      var charStr = String.fromCharCode(charCode);      
      if (!charStr.match(/^[0-9]+$/) || this.newReservUserForm.get('phoneNumber')?.value.toString().length > 10)
        e.preventDefault();
    }
  }



