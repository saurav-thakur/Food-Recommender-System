import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-driver-add',
  templateUrl: './driver-add.component.html',
  styleUrls: ['./driver-add.component.scss']
})
export class DriverAddComponent implements OnInit {

  public stepIndex: number = 0;
  public driverId: string;
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
  public prefferedLocations: string;

  constructor() { }

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
          // call backend
          let object = {
            "driverId": this.driverId,
            "email": this.email,
            "First Name": this.firstName,
            "Last name": this.lastName,
            "password": this.password,
            "phoneNumber": this.number,
            "age": this.age,
            "gender": this.gender,
            "houseNo": this.houseNo,
            "city": this.city,
            "locality": this.locality,
            "state": this.state,
            "pincode": this.pincode,
            "preffered Locations": this.prefferedLocations
          };

          alert(JSON.stringify(object));
          break;
        default:
          alert('Wow, this should not happen!');
      }
    }

}
