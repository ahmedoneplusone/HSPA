import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor() { }


  authUser(user:any){
    let Users = [];
    if(localStorage.getItem('Users')){
      Users = JSON.parse(localStorage.getItem('Users'));
    }
    return Users.find(p=>p.userName  === user.userName && p.password === user.password);
  }
}
