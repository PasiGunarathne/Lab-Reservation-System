import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { Lab } from '../shared/lab.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private term: string = "";

  constructor(private _router: Router, private _route: ActivatedRoute, private authService: AuthService) {
    this._route.params.subscribe(params => {
      console.log(params);
      if (params['term']) {
        // this.onSearch(params['term'])
      }
    });
  }

  doSearch() {
    // path and the object(search and term)
    this._router.navigate(['/search', { term: this.term }])
  }
  onSearch() {
    // this.authService.searchLab(term);
  }

  ngOnInit() {
    this.refreshLabList();

  }
  refreshLabList() {
    this.authService.getLabList().subscribe((res) => {
      this.authService.labs = res as Lab[];
    })
  }

}



