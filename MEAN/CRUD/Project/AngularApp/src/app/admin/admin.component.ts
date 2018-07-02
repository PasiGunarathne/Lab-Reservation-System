import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { RouterModule, Router } from '@angular/router';
import { Lab } from '../shared/lab.model';
import { NgForm } from '@angular/forms';
import { User } from '../shared/user.model';

declare var M: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [AuthService]

})
export class AdminComponent implements OnInit {

  username: String = '';

  constructor(private authService: AuthService, private _router: Router) {
    this.authService.admin()
      .subscribe(
        data => { console.log(data); this.addName(data) },
        error => this._router.navigate(['/login'])
      )
  }
  addName(data) {
    this.username = data.bname;
  }


  // ngOnInit
  ngOnInit() {
    this.resetForm();
    this.resetFormUser();
    this.refreshLabList();
    this.refreshUserList();
  }


// reset n update the lab reservation
  resetFormUser(form?: NgForm) {
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

  // update lab reservation
  onSubmitUser(form: NgForm) {
    this.authService.putUser(form.value).subscribe((res) => {
      this.resetFormUser(form);
      this.refreshUserList();
      M.toast({ html: 'User has been updated', classes: 'rounded' });
      // this.refreshLabList();

    });
    // if (form.value._id == "") {
    //   this.authService.postUser(form.value).subscribe((res) => {
    //     this.resetForm(form);
    //     this.refreshLabList();
    //     M.toast({ html: 'Lab reservation request has been saved', classes: 'rounded' });
    //     this.refreshLabList();

    //   });
    // }
    // else {
    //   this.authService.putUser(form.value).subscribe((res) => {
    //     this.resetFormUser(form);
    //     this.refreshUserList();
    //     M.toast({ html: 'User has been updated', classes: 'rounded' });
    //     // this.refreshLabList();

    //   });
    // }
  }

  // view current users
  refreshUserList() {
    this.authService.getUserList().subscribe((res) => {
      this.authService.users = res as User[];
    })
  }

  // update user
  onEditUser(users: User) {
    this.authService.selectedUser = users;
  }

  // delete user
  onDeleteUser(_id: string, form: NgForm) {
    if (confirm('Are you sure you want to delete this User ?') == true) {
      this.authService.deleteUser(_id).subscribe((res) => {
        this.refreshUserList();
        this.resetForm(form);
        M.toast({ html: 'User has been deleted', classes: 'rounded' });

      })
    }
  }



  // log out from admin
  logout() {
    this.authService.logout()
      .subscribe(
        data => { console.log(data); this._router.navigate(['/login']) },
        error => console.error(error)
      )
  }



  // reset n update the lab reservation
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.authService.selectedLab = {
      _id: "",
      date: "",
      time: "",
      lab: "",
      session: "",
      person: "",
    }
  }

  // update lab reservation
  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.authService.postLab(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshLabList();
        M.toast({ html: 'Lab reservation request has been saved', classes: 'rounded' });
        this.refreshLabList();

      });
    }
    else {
      this.authService.putLab(form.value).subscribe((res) => {
        this.resetForm(form);
        // this.refreshLabList();
        M.toast({ html: 'Lab reservation request has been updated', classes: 'rounded' });
        this.refreshLabList();

      });
    }
  }

  // view current lab reservation
  refreshLabList() {
    this.authService.getLabList().subscribe((res) => {
      this.authService.labs = res as Lab[];
    })
  }

  // update, edit from admin page
  onEdit(labReservation: Lab) {
    this.authService.selectedLab = labReservation;
  }

  // delete lab reservation
  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure you want to delete this reservation ?') == true) {
      this.authService.deleteLab(_id).subscribe((res) => {
        this.refreshLabList();
        this.resetForm(form);
        M.toast({ html: 'Lab reservation  has been deleted', classes: 'rounded' });
      })
    }
  }

}
