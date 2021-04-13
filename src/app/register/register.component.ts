import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public stepIndex: number = 0;
  public username: string;
  public email: string;
  public password: string;
  public code: number = 91;
  public number: string;
  public age: number;
  public gender: string;
  public houseNo: string;
  public locality: string;
  public city: string;
  public state: string;
  public pincode: number;

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
          alert('In register');
          break;
        default:
          alert('Wow, this should not happen!');
      }
    }
  }
