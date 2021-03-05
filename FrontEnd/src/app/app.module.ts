import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EditorModule } from '@tinymce/tinymce-angular';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { NewReservationComponent } from './components/reservations/new-reservation/new-reservation.component';
import { EditReservationComponent } from './components/reservations/edit-reservation/edit-reservation.component';
import { ListReservationComponent } from './components/reservations/list-reservation/list-reservation.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';

import { UserService } from './services/user.service';
import { ReservationService } from './services/reservation.service';
import { FavoriteService } from './services/favorite.service';
import { ContactTypeService } from './services/contact-type.service';
import {NgxPaginationModule} from 'ngx-pagination';



@NgModule({
  declarations: [
    AppComponent,
    NewReservationComponent,
     EditReservationComponent,
    ListReservationComponent, PageNotFoundComponent, EditReservationComponent
  ],
  imports: [
    BrowserModule,
    EditorModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule,
    NgxPaginationModule
  ],
  providers: [UserService, ReservationService, FavoriteService, ContactTypeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
