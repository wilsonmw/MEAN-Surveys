import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {

  poll = {};

  constructor(private _pollService: PollService, private _route: ActivatedRoute) {
    this._route.paramMap.subscribe(params => {
      var pollId = params.get('id');
      console.log(pollId);
      this._pollService.getPoll(pollId);

      this._pollService.singlePollObserver.subscribe(singlePoll =>{
        this.poll = singlePoll;
      })
      
    })
   }

  addVote(id){
    console.log(this.poll['_id'], "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    console.log(id, "*&*&*&*&*&*&*&*&**87*&**&*&*&*&*");
    this._pollService.addVote(id, this.poll['_id']);
  }

  ngOnInit() {
    console.log(this.poll);
  }

}
