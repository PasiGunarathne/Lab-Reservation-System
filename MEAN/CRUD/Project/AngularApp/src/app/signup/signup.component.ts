import { Component, OnInit } from '@angular/core';

import { AuthService } from '../shared/auth.service';
import { RouterModule, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
// import { Lab } from '../shared/lab.model';
import { User } from '../shared/user.model';

declare var M: any;


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [AuthService]

})

export class SignupComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    bname: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    contact: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    cpassword: new FormControl(null, [Validators.required])

  })

  constructor(private _router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.resetForm();
    // this.refreshUserList();
  }

  // reset the form with type FormGroup
  resetForm(form?: FormGroup) {
    if (form)
      form.reset();
    this.authService.selectedUser = {
      _id: "",
      bname: "",
      email: "",
      contact: "",
      password: "",
      cpassword: "",


    }
  }

  // onSubmit(form: NgForm){ 
  //   this.authService.postUser(form.value).subscribe((res) => {
  //     this.resetForm(form);
  //     M.toast({html : 'You Registered successfully', classes: 'rounded'});
  //     this.refreshUserList();

  //   });
  // }

  // refreshUserList(){
  //   this.authService.getUserList().subscribe((res) => {
  //     this.authService.users = res as User[];
  //   })
  // }

  moveToLogin() {
    this._router.navigate(['/login']);

  }

  register() { 
    if (!this.registerForm.valid || (this.registerForm.controls.password.value != this.registerForm.controls.cpassword.value)) {
      console.log('Invalid registration');
      M.toast({ html: 'Invalid registration', classes: 'rounded' }); return;

    }

    // print all values in console if a valid registration
    console.log(JSON.stringify(this.registerForm.value));
    console.log('hell1');

    this.authService.register(this.registerForm.value).subscribe((res) => {
      this.resetForm(this.registerForm);
      M.toast({ html: 'You Registered successfully', classes: 'rounded' });
      // this.refreshUserList();
      this.moveToLogin();

    });
  }

}

