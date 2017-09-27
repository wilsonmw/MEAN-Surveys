import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    
    currentUser={};
    polls = [];

  constructor(private _pollService: PollService) {
    this._pollService.pollObserver.subscribe(polls =>{
      this.polls = polls;
    })
    this._pollService.retrievePolls();
    console.log("**************************************");
  }
  
  delete(pollId){
    this._pollService.delete(pollId);
  }

  ngOnInit() { 

    this._pollService.getUser()
      .then(user => {
        this.currentUser = user
        console.log(user, "****************** from dashboard component level.")
      })
      .catch(error => console.log(error))

  }

}
