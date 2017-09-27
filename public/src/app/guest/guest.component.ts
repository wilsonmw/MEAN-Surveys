import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  user = {
    username: ""
  };

  constructor(private _userService: UserService, private _activatedRoute: ActivatedRoute) { 
    this._userService.clearUser();
  }

  login(){
    var currentUser = this._userService.findUser(this.user);
    console.log("We're at the component.ts level");
  }

  
  ngOnInit() {
  }

}
