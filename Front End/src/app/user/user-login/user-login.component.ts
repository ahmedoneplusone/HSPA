import { Router} from '@angular/router';
import { AlertifyService } from './../../services/alertify.service';
import { AuthService } from './../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private AuthService:AuthService,private AlertifyService:AlertifyService,private router:Router) { }

  ngOnInit() {
  }

  OnLogin(loginForm:NgForm){
    console.log(loginForm.value);
    const token = this.AuthService.authUser(loginForm.value);
    if(token){
      localStorage.setItem('token',token.userName);
      this.AlertifyService.success("Login Successfull");
      this.router.navigate(['/']);
    }else{
      this.AlertifyService.error("Check Username & Password");
    }
  }
}
