import { Component, OnInit } from '@angular/core';
import { FrsDataService } from '../frs-data.service';
import { ToastrService } from 'ngx-toastr';
import { formatCurrency } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public stepIndex: number = 0;
  public username: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public code: number = 91;
  public number: string;
  public age: number;
  public gender: string = 'male';
  public houseNo: string;
  public locality: string;
  public city: string;
  public state: string;
  public pincode: number;
  public saveAs: string;

  constructor(public frsService: FrsDataService, public router: Router, public toastr: ToastrService) { }

  ngOnInit(): void {
  }

  controlSteps(pageName: string) {
      switch(pageName) {
        case 'page1':
          this.stepIndex = 0;
          break;
        case 'page2':
          this.stepIndex = 1;
          break;
        case 'register':
          document.getElementById('reg-button').style.display = 'none';
          document.getElementById('load-button').style.display = 'block';
          let gending;
         if(this.gender=="male") {
           gending = 'M';
         }
         else if(this.gender=="female") {
          gending = 'F';
        }
        else {
          gending = 'O';
        }
          
          let object = {
            "Username": this.username,
            "Email": this.email,
            "First_name": this.firstName,
            "Last_name": this.lastName,
            "Password": this.password,
            "Code": "+91",
            "Number": this.number,
            "Age": this.age,
            "Gender": gending,
            "Account_status": "A",
            "Address_name": this.saveAs,
            "house_no": this.houseNo,
            "previelege": "U",
            "city": this.city,
            "locality": this.locality,
            "state": this.state,
            "pincode": this.pincode
          };

          this.frsService.createUser(object).subscribe(
            data => {
              document.getElementById('reg-button').style.display = 'block';
              document.getElementById('load-button').style.display = 'none';
              console.log(data);
              if(data.Message.includes("taken")){
                this.toastr.error("Try another username", data.Message)
              }
              else
              {
                this.toastr.success(data.Message, "Regestration Successful :)")
                setTimeout(() => {
                  this.router.navigateByUrl('/login')
                }, 3000)
              }
            },
            
            error => {
              console.log("Some error has occured"+JSON.stringify(error));
            }
          )

          // alert(JSON.stringify(object));
          break;
        default:
          alert('Wow, this should not happen!');
      }
    }
  }
