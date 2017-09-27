import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { GuestComponent } from './guest/guest.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PollComponent } from './poll/poll.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {path: '', component: GuestComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'createNewPoll', component: CreateComponent},
  {path: 'poll/:id', component: PollComponent},
  {path: 'logout', component: GuestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
