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

  ngOnInit(): void {

  }


}
