import { Component, OnInit } from '@angular/core';
import { FrsDataService } from '../frs-data.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public userName;
  constructor(public frsService: FrsDataService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('cartCount') != null) {
      this.frsService.cartCount = parseInt(sessionStorage.getItem('cartCount'));
    }
    if(sessionStorage.getItem('userDetails') != null) {
      this.userName = Object.keys(JSON.parse(sessionStorage.getItem('userDetails')))[0];
    }
  }

  logout() {
    
  }

}
