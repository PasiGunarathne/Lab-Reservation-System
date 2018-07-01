import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Lab } from '../shared/lab.model';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthService]
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // this.resetForm();
    this.refreshLabList();
  }


  refreshLabList(){
    this.authService.getLabList().subscribe((res) => {
      this.authService.labs = res as Lab[];
    })
  }


}
