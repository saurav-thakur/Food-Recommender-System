import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

	public restId: any;
	public dishId: any;

  constructor(public _route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
	  this.restId = this._route.snapshot.paramMap.get('restId');
	  this.dishId = this._route.snapshot.paramMap.get('dishId');
	  alert("Rest ID: " + this.restId + " " + "Dish ID: " + this.dishId);
  }

  


  // // Input Plus & Minus Number JS
	// $('.input-counter').each(function() {
	// 	var spinner = jQuery(this),
	// 	input = spinner.find('input[type="text"]'),
	// 	btnUp = spinner.find('.plus-btn'),
	// 	btnDown = spinner.find('.minus-btn'),
	// 	min = input.attr('min'),
	// 	max = input.attr('max');
		
	// 	btnUp.on('click', function() {
	// 		debugger;
	// 		var oldValue = parseFloat(input.val());
	// 		if (oldValue >= max) {
	// 			var newVal = oldValue;
	// 		} else {
	// 			var newVal = oldValue + 1;
	// 		}
	// 		spinner.find("input").val(newVal);
	// 		spinner.find("input").trigger("change");
	// 	});
	// 	btnDown.on('click', function() {
	// 		var oldValue = parseFloat(input.val());
	// 		if (oldValue <= min) {
	// 			var newVal = oldValue;
	// 		} else {
	// 			var newVal = oldValue - 1;
	// 		}
	// 		spinner.find("input").val(newVal);
	// 		spinner.find("input").trigger("change");
	// 	});
	// });

}
