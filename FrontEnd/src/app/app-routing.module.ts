import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewReservationComponent } from './components/reservations/new-reservation/new-reservation.component';
import { EditReservationComponent } from './components/reservations/edit-reservation/edit-reservation.component';
import { ListReservationComponent } from './components/reservations/list-reservation/list-reservation.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: 'new', component : NewReservationComponent},
  {path: 'edit/:id/:name', component : EditReservationComponent},
  {path: 'list', component : ListReservationComponent},
  {path: '', redirectTo: '/list', pathMatch: 'full'},
  {path: '**', component : PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
