import { Component, OnInit } from '@angular/core';
import { FrsDataService } from '../frs-data.service';
import { ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent implements OnInit {

  constructor(public frsService: FrsDataService, public _route: ActivatedRoute, public router: Router) { }

  public restId: any;

  ngOnInit(): void {
    this.restId = this._route.snapshot.paramMap.get('restId');;
	  alert("Rest ID: " + this.restId );
  }

}
