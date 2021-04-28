import { Component, OnInit } from '@angular/core';
import { FrsDataService } from '../frs-data.service';

@Component({
  selector: 'app-admin-stats',
  templateUrl: './admin-stats.component.html',
  styleUrls: ['./admin-stats.component.scss']
})
export class AdminStatsComponent implements OnInit {

  constructor(public frsService: FrsDataService) { }

  public adminStatsObject: any;

  ngOnInit(): void {
    this.frsService.adminStats().subscribe(
      data => {
        this.adminStatsObject = data
        console.log(typeof this.adminStatsObject.restCount)
      console.log(JSON.stringify(this.adminStatsObject))
      },
      
      error => {
        console.log("Some error has occured"+JSON.stringify(error));
      }
    )
  }

}
