import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { FrsDataService } from '../frs-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public frsService: FrsDataService) { }

  ngOnInit(): void {
  }

  public somemethod() {
    alert(JSON.stringify(this.frsService.productArray[0]));
  }

  ratingArray(n: number): any[] {
    return Array(n);
    
  }
}
