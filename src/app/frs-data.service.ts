import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FrsDataService {

  public baseUrl = 'http://localhost:5000';

  constructor(private _http: HttpClient) { }

  public getProductArrays(): any {
    let myResponse = this._http.get(this.baseUrl + '/getProductArray');

    return myResponse;
  }

  public createUser(data): any {
    let myResponse = this._http.post(this.baseUrl + '/updateUser', data);

    return myResponse;
  }

  public createRestaurant(data): any{
    let myResponse = this._http.post(this.baseUrl + '/updateRestaurant', data);
    return myResponse;
  }

  public restaurants = [
    {
      "name": "Rest 1",
      "restId": 101,
      "dishIds": [20, 1,2,13,5]
    },

    {
      "name": "Rest 2",
      "restId": 102,
      "dishIds": [20, 1,12,3,5]
    },

    {
      "name": "Rest 3",
      "restId": 105,
      "dishIds": [20, 1,25,3,5]
    },

    {
      "name": "Rest 4",
      "restId": 110,
      "dishIds": [20, 1,2,3,5]
    }

  ]

  // public productArray = [
  //   {
  //     "name": "Dish 1",
  //     "restId": 101,
  //     "dishId": 20,
  //     "actual cost": "200",
  //     "discounted price": "150",
  //     "rating": 5
  //   },

  //   {
  //     "name": "Dish 2",
  //     "restId": 102,
  //     "dishId": 21,
  //     "actual cost": "400",
  //     "discounted price": "375",
  //     "rating": 4
  //   },

  //   {
  //     "name": "Dish 3",
  //     "restId": 102,
  //     "dishId": 25,
  //     "actual cost": "300",
  //     "discounted price": "200",
  //     "rating": 3
  //   },

  //   {
  //     "name": "Dish 4",
  //     "actual cost": "450",
  //     "restId": 105,
  //     "dishId": 40,
  //     "discounted price": "300",
  //     "rating": 4
  //   }
  // ]

  // public productArray2 = [
  //   {
  //     "name": "Popular Dish 1",
  //     "actual cost": "200",
  //     "discounted price": "150",
  //     "rating": 5
  //   },

  //   {
  //     "name": "Polular Dish 2",
  //     "actual cost": "400",
  //     "discounted price": "375",
  //     "rating": 4
  //   },

  //   {
  //     "name": "Popular Dish 3",
  //     "actual cost": "300",
  //     "discounted price": "200",
  //     "rating": 3
  //   },

  //   {
  //     "name": "Popular Dish 4",
  //     "actual cost": "450",
  //     "discounted price": "300",
  //     "rating": 4
  //   }
  // ]
}
