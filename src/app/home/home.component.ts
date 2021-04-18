import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { FrsDataService } from '../frs-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public frsService: FrsDataService) { }

  public productArray;
  public productArray2;

  ngOnInit(): void {
    this.frsService.getProductArrays().subscribe(
      data => {
        console.log(data);
        this.productArray = data.productArray;
        this.productArray2 = data.productArray2;
      },
      
      error => {
        console.log("Some error has occured"+error.errorMessage);
      }
    )
  }

  public somemethod() {
   // alert(JSON.stringify(this.frsService.productArray[0]));
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }
}
