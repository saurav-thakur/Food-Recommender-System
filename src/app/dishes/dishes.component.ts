import { Component, OnInit } from '@angular/core';
import { FrsDataService } from '../frs-data.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent implements OnInit {

constructor(public frsService: FrsDataService) { }

  ngOnInit(): void {
  }

}
