import { Component, OnInit } from '@angular/core';
import { FrsDataService } from '../frs-data.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  constructor(public frsService: FrsDataService) { }

numSequence(n: number): Array<number> {
    return Array(n);
  }

  public tabChangeCity;

  public selected_city = "Hyderabad";
  public restList: any = [];
  public arr = []

  ngOnInit(): void {
    this.getRestaurantsMethod(this.selected_city);
  }

  getRestaurantsMethod(city) {
    this.frsService.getRestaurants(city).subscribe(
      data => {
        this.restList =  data["Restaurant details"];
      //   for(let key in this.restList){
      //   if(this.restList.hasOwnProperty(key)){
      //     this.arr.push(this.restList[key]);
      //   }
      // }
      //  console.log(typeof this.arr)
      },
      
      error => {
        console.log("Some error has occured"+JSON.stringify(error));
      }
    )
  }

  onTabChanged($event) {
    switch($event.index) {
      case 0: 
        this.tabChangeCity = 'Hyderabad';
        break;
      case 1: 
        this.tabChangeCity = 'Delhi';
        break;
      case 2: 
        this.tabChangeCity = 'Vizag';
        break;
      case 3: 
        this.tabChangeCity = 'Bangalore';
        break;
    }

    console.log(this.tabChangeCity);
    this.getRestaurantsMethod(this.tabChangeCity);
  }


}
