import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FrsDataService } from '../frs-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(public frsService: FrsDataService, public router: Router, public toastr: ToastrService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('cartCount') != null) {
      this.frsService.cartCount = parseInt(sessionStorage.getItem('cartCount'));
    }
    this.frsService.postLoginActivities();
  }

  logout() {
    sessionStorage.removeItem('userDetails');
    sessionStorage.removeItem('restDetails')
    this.frsService.userName = undefined;
    this.frsService.restName = undefined;
    this.frsService.isAdmin = false;
    this.frsService.isRestaurant = false;
    this.router.navigateByUrl('/login');
    this.toastr.success('We will miss you.', 'You are now Logged Out ;(')
  }

}
