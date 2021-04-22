import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { FrsDataService } from '../frs-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username: string;
  public password: string;
  public restId: number;
  public userData: any;
  public isRestaurantLogin: boolean = false;

  constructor(public frsService: FrsDataService, public router: Router) { }

  ngOnInit(): void {
  }

  login() {
    if(this.isRestaurantLogin) {
      this.restaurantLogin();
    }
    else{
    let object = {
      "userName": this.username,
      "password": this.password
    }
    this.frsService.login(object).subscribe(
      data => {
        // this.userData =  data
        if(Object.keys(data).length == 1){
          alert('Invalid Credentials')
        }
        else{
          alert('Login Successful\n'+JSON.stringify(data))
          sessionStorage.setItem('userDetails', JSON.stringify(data));
          this.frsService.postLoginActivities();
          let p = data.privelege
          if(p=="A")
          {
            this.router.navigateByUrl('/admin');
          }
          else
          {
            this.router.navigateByUrl('/home');
          }

        }

      },
      
      error => {
        console.log("Some error has occured"+JSON.stringify(error));
      }
      )
    }
   
  }

  restaurantLogin() {
    let object = {
      "restId": this.restId,
      "password": this.password
    }

    this.frsService.restLogin(object).subscribe(
      data => {
        // this.userData =  data
        if(Object.keys(data).length == 1){
          alert('Invalid Credentials')
        }
        else{
          alert('Login Successful\n'+JSON.stringify(data))
          sessionStorage.setItem('restDetails', JSON.stringify(data));
          this.frsService.postLoginActivities();
          this.router.navigateByUrl('/restaurant-admin')

        }

      },
      
      error => {
        console.log("Some error has occured"+JSON.stringify(error));
      }
      )

  }

  showRestLogin(){
    this.isRestaurantLogin = true;
  }
  showUserLogin() {
    this.isRestaurantLogin = false;
  }

}
