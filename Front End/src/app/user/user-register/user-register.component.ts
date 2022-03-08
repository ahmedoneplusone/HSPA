import { AlertifyService } from './../../services/alertify.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../model/IUser.interface';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registerationForm : FormGroup;
  user: IUser;

  constructor(private UserService:UserService,private AlertifyService:AlertifyService) { }

  ngOnInit() {
    this.registerationForm = new FormGroup({
      userName: new FormControl(null,[Validators.required,Validators.minLength(4),Validators.maxLength(50)]),
      email: new FormControl(null,[Validators.required,Validators.email]),
      password: new FormControl(null,[Validators.required,Validators.minLength(8),Validators.maxLength(100)]),
      confirmPassword : new FormControl(null,[Validators.required,Validators.minLength(8),Validators.maxLength(100)]),
      mobile : new FormControl(null,[Validators.required,Validators.minLength(8),Validators.maxLength(16)])
    },this.PasswordMatchingValidator)
  }

  PasswordMatchingValidator(fg:FormGroup):Validators{
    return fg.get('password').value === fg.get('confirmPassword').value ? null : {notMatched: true};
  }

  get GetUserName(){
    return this.registerationForm.get('userName') as FormControl;
  }
  get GetEmail(){
    return this.registerationForm.get('email') as FormControl;
  }
  get GetPassword(){
    return this.registerationForm.get('password') as FormControl;
  }
  get GetConfirmPassword(){
    return this.registerationForm.get('confirmPassword') as FormControl;
  }
  get GetMobile(){
    return this.registerationForm.get('mobile') as FormControl;
  }

  OnSubmit(){
    // console.log(this.registerationForm.value);

    this.registerationForm.markAllAsTouched();

    if(this.registerationForm.valid){
    // this.user = Object.assign(this.user ,this.registerationForm.value);
    this.UserService.addUser(this.userData());
    this.registerationForm.reset();
    this.AlertifyService.success("Saved Successfully");
    }else{
    this.AlertifyService.error("Please fill all the required fields");
    }

  }

  userData():IUser {
    return this.user = {
      userName: this.GetUserName.value,
      email: this.GetEmail.value,
      password: this.GetPassword.value,
      mobile: this.GetMobile.value
    }
  }

}
