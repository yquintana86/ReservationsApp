import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl, NgForm, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { Reserv } from 'src/app/models/reserv';
import { ContactType } from 'src/app/models/contactType';
import { ContactTypeService } from 'src/app/services/contact-type.service';

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

  constructor(private userservice: UserService, private reservationservice: ReservationService, private contact: ContactTypeService
    , private toastr: ToastrService, newReservUserBuilder: FormBuilder) {

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
  }

  loadContactSelect() {
    this.contactTypeArray.splice(0, this.contactTypeArray.length);
    this.contact.getContactTypes().subscribe(data => {
      data.forEach(element => {
        this.contactTypeArray.push(element);
      });
    });

  }

saveReservation(): void {

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

  save_reserv(): void {
    const reserv: Reserv = {
      reservationDate: new Date(),
      contactName: this.newReservUserForm.get('contactName')?.value,
      reservationInfo: this.newReservUserForm.get('reservationInfo')?.value,
      voters: 1,
      votings: 0
    }
    this.reservationservice.save_reservation(reserv).subscribe(data => {
      this.newReservUserForm.reset();
    });
  }

  save_user(): void {
    const user: User = {
      contactName: this.newReservUserForm.get('contactName')?.value,
      contactTypeName: this.newReservUserForm.get('contactTypeName')?.value,
      phoneNumber: this.newReservUserForm.get('phoneNumber')?.value,
      birthDate: this.newReservUserForm.get('birthDate')?.value
    }
    this.userservice.saveUser(user).subscribe(data => {
      this.toastr.success('Reservation Saved', 'The reservation was successfully saved');
    })
  }
  update_user(): void {
    const user: User = {
      contactName: this.newReservUserForm.get('contactName')?.value,
      contactTypeName: this.newReservUserForm.get('contactTypeName')?.value,
      phoneNumber: this.newReservUserForm.get('phoneNumber')?.value,
      birthDate: this.newReservUserForm.get('birthDate')?.value
    }
    this.userservice.updateuser(user).subscribe(data => {
      this.toastr.success('Reservation Saved', 'The reservation was successfully saved');
    })
  }

  public checkExistency() {
    let conctact: string = this.newReservUserForm.get('contactName')?.value;
    if (conctact.length > 3) {
      this.userservice.getUsersByContactName(conctact).subscribe(data => {
        if (data) {
          this.newReservUserForm.controls.contactTypeName.setValue(data.contactTypeName.toString());
          this.newReservUserForm.controls.phoneNumber.setValue(new Number(data.phoneNumber));
          this.newReservUserForm.controls.birthDate.setValue(new Date(data.birthDate.toString()));
        }
        else {
          this.newReservUserForm.controls.phoneNumber.setValue('');
          this.newReservUserForm.controls.birthDate.setValue(new Date());
        }
      });     
    }    
    }
  }



