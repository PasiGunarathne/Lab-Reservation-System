import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { RouterModule, Router } from '@angular/router';

import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../shared/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup=new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password : new FormControl(null,[Validators.required])
  })

  constructor(private _router:Router, private authService: AuthService) { }
  // constructor(private _router: Router) { }

  ngOnInit() {
    // this.refreshUserList();
  }

  // loginUser1(event) {
  //   event.preventDefault()
  //   const target = event.target
  //   const username = target.querySelector('#username').value
  //   const password = target.querySelector('#password').value

  //   this.authService.getUserDetails(username, password)
  //   console.log(username, password)
    
  // }

  // refreshUserList(){
  //   this.authService.getUserList().subscribe((res) => {
  //     this.authService.users = res as User[];
  //   }) 
  // }

  moveToRegister(){
    this._router.navigate(['/signup']);
  }
 
  loginUser(){ 
    if(!this.loginForm.valid){
      console.log("Invalid");
      
      return;
      
    }
    // console.log(JSON.stringify(this.loginForm.value)); 
    console.log('hello1');
    // wolf@gmail.com
    this.authService.login(JSON.stringify(this.loginForm.value))
    .subscribe(
      data=>{console.log(data);
        // navigate to user page
        if (this.loginForm.controls.email.value!="max@gmail.com") {
          console.log('user page');
          return this._router.navigate(['/user']);
          
        }
        // navigate to admin page
        this._router.navigate(['/admin']);
        
      } ,
      error=>console.error(error)
    )   

  }




  // loginAdmin(){
  //   this.authService.navigate(['/admin']);
  // }

 


}
