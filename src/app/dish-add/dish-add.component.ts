import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dish-add',
  templateUrl: './dish-add.component.html',
  styleUrls: ['./dish-add.component.scss']
})
export class DishAddComponent implements OnInit {

  public stepIndex: number = 0;
  public dishId: string;
  public dishName: string;
  public actualPrice: number;
  public discPrice: number;
  public dishDesc: string;
  public dishTags: string;

  constructor() { }

  ngOnInit(): void {
  }

  controlSteps(pageName: string) {
      switch(pageName) {
        case 'page1':
          this.stepIndex = 0;
          break;
        case 'register':
          // call backend
          let object = {
            "dishId": this.dishId,
            "dishName": this.dishName,
            "actualPrice": this.actualPrice,
            "discPrice": this.discPrice,
            "dishDesc": this.dishDesc,
            "dishTags": this.dishTags
          };

          alert(JSON.stringify(object));
          break;
        default:
          alert('Wow, this should not happen!');
      }
    }
}
