import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  poll = {
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: ""
  }

  constructor(private _pollService: PollService, private _activatedRoute: ActivatedRoute) { }

  createNew(){
    this._pollService.createPoll(this.poll);
  }

  ngOnInit() {
  }

}
