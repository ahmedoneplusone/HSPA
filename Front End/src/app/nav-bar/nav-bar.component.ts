import { AlertifyService } from './../services/alertify.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loggedinUser: string;
  constructor(private AlertifyService:AlertifyService) { }

  ngOnInit() {
  }

  loggedIn(){
    this.loggedinUser = localStorage.getItem('token');
    return this.loggedinUser;
  }

  OnLogOut(){
    localStorage.removeItem('token');
    this.AlertifyService.success("You Are Logged Out !");
  }
}
