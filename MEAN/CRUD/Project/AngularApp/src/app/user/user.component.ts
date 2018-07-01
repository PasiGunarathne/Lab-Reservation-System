import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { RouterModule, Router } from '@angular/router';
import { Lab } from '../shared/lab.model';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  username:String='';
  constructor(private authService: AuthService, private _router:Router) {
    this.authService.user()
    .subscribe(
      data=>{console.log(data);this.addName(data)},
      error=>this._router.navigate(['/login'])
    )
   }
 
   addName(data){
    this.username = data.bname;
  }

  ngOnInit() {
    this.refreshLabList();
  } 

  logout(){
    this.authService.logout()
    .subscribe(
      data=>{console.log(data);this._router.navigate(['/login'])},
      error=>console.error(error)
    )
  }

// view current lab reservation
  refreshLabList(){
    this.authService.getLabList().subscribe((res) => {
      this.authService.labs = res as Lab[];
    })
  }


}
