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

  public userData: any;

  constructor(public frsService: FrsDataService, public router: Router) { }

  ngOnInit(): void {
  }

  login() {
    let object = {
      "userName": this.username,
      "password": this.password
    }
    this.frsService.login(object).subscribe(
      data => {
        // this.userData =  data
        if(data["Username"]) {
          alert('Incorrect credentials!');
        } else {
          alert('Login Successful!');
          sessionStorage.setItem('userDetails', JSON.stringify(data));
          if(data[`${this.username}`] == 'A') {
            this.router.navigate(['/admin']);
          }
          else {
            this.router.navigate(['/home']);
          }
        }

        
      //   for(let key in this.restList){
      //   if(this.restList.hasOwnProperty(key)){
      //     this.arr.push(this.restList[key]);
      //   }
      // }
      // console.log(this.dishData)
      },
      
      error => {
        console.log("Some error has occured"+JSON.stringify(error));
      }
      )
   
  }

}
