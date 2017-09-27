import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PollService {
  user = {};
  polls = [];
  poll = {};
  pollObserver = new BehaviorSubject(this.polls);
  singlePollObserver = new BehaviorSubject(this.poll);

  constructor(private _http: Http, private _route: ActivatedRoute, private _router: Router) { }

  createPoll(poll){
    this._http.post('/poll', poll).subscribe(
      (response)=>{
        response.json();
        // this.retrievePolls();
        this._router.navigate(['/dashboard'])
      },
      (err)=>{
        console.log("There was an error creating the poll at the service.ts level.")
      }
    );
  };

  retrievePolls(){
    this._http.get('/polls').subscribe(
      (response)=>{
        this.polls = response.json();
        this.pollObserver.next(this.polls);
      },
      (err)=>{
        console.log("There was an error retrieving the polls at the service.ts level.")
      }
    )
  }

  getUser() {
    return this._http.get('/user')
      .map(data => data.json())
      .toPromise()
  }

  getPoll(pollId){
    console.log(pollId, "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    this._http.get(`/poll/${pollId}`).subscribe(
      (response)=>{
        this.poll = response.json();
        this.singlePollObserver.next(this.poll);
      }, (err)=> {
        console.log("There was an error retrieving the single poll at the service.ts level.");
      }
    )
  }

  addVote(optionId, pollId){
    this._http.get(`/option/${optionId}`).subscribe(
      (response)=>{
        this.getPoll(pollId);
      }, (err) =>{
        console.log("There was an error saving the vote at the service.ts level.");
      }
    )
  }
 
  delete(pollId){
    this._http.get(`/delete/${pollId}`).subscribe(
      (response)=>{
        this.retrievePolls();
      }, (err)=>{
        console.log("There was an error deleting the poll at the service.ts level.");
      }
    )
  }

}
