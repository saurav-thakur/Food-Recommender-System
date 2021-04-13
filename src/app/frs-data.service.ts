import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FrsDataService {

  constructor() { }

  public productArray = [
    {
      "name": "Dish 1",
      "actual cost": "200",
      "discounted price": "150",
      "rating": [1,1,1,1,1]
    },

    {
      "name": "Dish 2",
      "actual cost": "400",
      "discounted price": "375",
      "rating": [1,1,1,1]
    },

    {
      "name": "Dish 3",
      "actual cost": "300",
      "discounted price": "200",
      "rating": [1,1,1]
    },

    {
      "name": "Dish 4",
      "actual cost": "450",
      "discounted price": "300",
      "rating": [1,1,1,1]
    }
  ]

  public productArray2 = [
    {
      "name": "Health Dish 1",
      "actual cost": "200",
      "discounted price": "150",
      "rating": [1,1,1,1,1]
    },

    {
      "name": "Health Dish 2",
      "actual cost": "400",
      "discounted price": "375",
      "rating": [1,1,1,1]
    },

    {
      "name": "Health Dish 3",
      "actual cost": "300",
      "discounted price": "200",
      "rating": [1,1,1]
    },

    {
      "name": "Health Dish 4",
      "actual cost": "450",
      "discounted price": "300",
      "rating": [1,1,1,1]
    }
  ]

  public productArray3 = [
    {
      "name": "Popular Dish 1",
      "actual cost": "200",
      "discounted price": "150",
      "rating": [1,1,1,1,1]
    },

    {
      "name": "Polular Dish 2",
      "actual cost": "400",
      "discounted price": "375",
      "rating": [1,1,1,1]
    },

    {
      "name": "Popular Dish 3",
      "actual cost": "300",
      "discounted price": "200",
      "rating": [1,1,1]
    },

    {
      "name": "Popular Dish 4",
      "actual cost": "450",
      "discounted price": "300",
      "rating": [1,1,1,1]
    }
  ]
}
