import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GuestComponent } from './guest/guest.component';
import { PollComponent } from './poll/poll.component';
import { CreateComponent } from './create/create.component';

import { UserService } from './user.service';
import { PollService } from './poll.service';
import { SurveyfilterPipe } from './surveyfilter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    GuestComponent,
    PollComponent,
    CreateComponent,
    SurveyfilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
  ],
  providers: [PollService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
