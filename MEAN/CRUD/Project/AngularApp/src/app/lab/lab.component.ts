import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
// import { RouterModule, Router } from '@angular/router';
// import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Lab } from '../shared/lab.model';

declare var M: any;

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.css'],
  providers: [AuthService]
})


export class LabComponent implements OnInit {


  constructor(private authService: AuthService) { }


  ngOnInit() {
    this.resetForm();
    this.refreshLabList();
  }

  resetForm(form?: NgForm){
    if (form) 
    form.reset();
    this.authService.selectedLab = {
      _id : "",
      date : "",
      time : "",
      lab : "",
      session : "",
      person : "",
      

    }        
  }

  onSubmit(form: NgForm){ 
    this.authService.postLab(form.value).subscribe((res) => {
      this.resetForm(form);
      M.toast({html : 'Your Lab reservation request has been sent to the Admin', classes: 'rounded'});
      this.refreshLabList();

    });
  }

  refreshLabList(){
    this.authService.getLabList().subscribe((res) => {
      this.authService.labs = res as Lab[];
    })
  }

}
