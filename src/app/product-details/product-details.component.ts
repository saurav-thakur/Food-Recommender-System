import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FrsDataService } from '../frs-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

	public restId: any;
	public dishId: any;
	public dishData: any;
	public dishList: any;

  constructor(public _route: ActivatedRoute, public router: Router, public frsService: FrsDataService, public toastr: ToastrService) { }

  ngOnInit(): void {
	  this.restId = this._route.snapshot.paramMap.get('restId');
	  this.dishId = this._route.snapshot.paramMap.get('dishId');
	//   alert("Rest ID: " + this.restId + " " + "Dish ID: " + this.dishId);

	  this.frsService.getDishDetails(this.restId, this.dishId).subscribe(
		data => {
		  this.dishData =  data
		//   for(let key in this.restList){
		//   if(this.restList.hasOwnProperty(key)){
		//     this.arr.push(this.restList[key]);
		//   }
		// }
		console.log(this.dishData)
		},
		
		error => {
		  console.log("Some error has occured"+JSON.stringify(error));
		}
	  )

    this.frsService.getDishes(this.restId).subscribe(
      data => {
        this.dishList =  data
      //   for(let key in this.restList){
      //   if(this.restList.hasOwnProperty(key)){
      //     this.arr.push(this.restList[key]);
      //   }
      // }
      console.log(this.dishList)
      },
      
      error => {
        console.log("Some error has occured"+JSON.stringify(error));
      }
    )
  }

  cartProcess() {
	  // document.getElementById()
	  let cartArray = JSON.parse(sessionStorage.getItem('cartArray'));
	  let cartData = {
		  "dishId": this.dishData.dishId,
		  "dishName": this.dishData.dishName,
		  "dishPrice": this.dishData.dishDiscCost,
		  "restId": this.dishData.restId,
		  "restName": this.dishData.restName,
		  "quantity": 1,
		  "totalCost": this.dishData.dishDiscCost
	  }
	let inCart = false;
	if(cartArray == null) {
		cartArray = [];
	}
	for(let i = 0; i < cartArray.length; i++) 
	{
		if(cartArray[i].dishId == this.dishId && cartArray[i].restId == this.restId) 
		{
			this.toastr.warning('Item already in Cart', 'Alert')
			inCart = true;
			break;
		}
	}
	if(!inCart)
	{
		if (cartArray.length !=0)
		{
			let lastRest = cartArray[cartArray.length-1].restId
			if(cartData.restId != lastRest)
			{
				this.toastr.error('Cannot add items of different Restaurants into cart', 'Alert')
				return;
			}
		}
		cartArray.push(cartData);
		this.toastr.info('Dish added into cart Successfully!', 'Info')
		sessionStorage.setItem('cartArray', JSON.stringify(cartArray));
		if(sessionStorage.getItem('cartCount') != null) {
			let value = parseInt(sessionStorage.getItem('cartCount')) + 1;
			sessionStorage.setItem('cartCount', value.toString());
		} else {
			sessionStorage.setItem('cartCount', "1");
		}
		this.frsService.cartCount++;
		
		// sessionStorage.getItem('')
	}
	 //this.frsService.cartArray.push(this.dishData);
	 // document.getElementById('cart-item-count').innerHTML = (parseInt(document.getElementById('cart-item-count').innerHTML) + 1).toString();
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
