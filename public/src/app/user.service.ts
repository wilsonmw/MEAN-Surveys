import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {

  constructor(private _http: Http, private _route: ActivatedRoute, private _router: Router) { }

  findUser(user){
    this._http.post('/findUser', user).subscribe(
      (response)=>{
        if(response.json()==null){
          console.log("User doesn't exist yet... creating user now.")
          this._http.post('/user', user).subscribe(
            (response)=>{
              console.log("User was created and made it back to the service.ts level.");
              console.log(response.json());
              this.findUser(user);
            },
            (err)=>{
              console.log("There was an error creating the user at the service.ts level.");
            });         
        } else {
          response.json();
          this._router.navigate(['/dashboard']);
        }
      },
      (err)=>{
        console.log("There was an error finding the user.");
      }
    )
  }

  clearUser(){
    this._http.get('/clearUser').subscribe(
      (response)=>{
        this._router.navigate(['']);
      }
    )
  }
}