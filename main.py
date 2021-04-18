from flask import Flask, request
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse
from flask_jwt import JWT, jwt_required
import db
import orders_util

app = Flask(__name__)
api = Api(app)
CORS(app)

class Order(Resource):

    order_parser = reqparse.RequestParser()
    order_parser.add_argument(
        'rest_ID',
        required="True",
        help = "Restaurant not specified..."
    )

    order_parser.add_argument(
        'dish_ID',
        required="True",
        help = "Dish not specified..."
    )

    order_parser.add_argument(
        'username',
        required="True",
        help = "Username not specified..."
    )

    order_details = reqparse.RequestParser()
    order_details.add_argument(
        'username',
        required="True",
        help = "Username Not Provided"
    )

    order_details.add_argument(
        'date',
        required="True",
        help = "Date Not Provided"
    )
    order_details.add_argument(
        'time'
    )

    order_details.add_argument(
        'bill',
        required="True",
        help = "Bill Not Provided"
    )

    def get(self, rest_ID, dish_ID):
        
        for order in orders_util.dskk_orders:
            if order['order1']['rest_ID'] == rest_ID and order['order1']['dish_ID'] == dish_ID:
                return order['order1']

    def post(self, rest_ID, dish_ID):
        data = Order.order_details.parse_args()
        print(data)
        username = data['username']
        date = data['date']
        time = data['time']
        bill = data['bill']
        orders_util.update_order(rest_ID, dish_ID, username,time, date, bill)
        return {"Message": "Order Updated Sucsesfully"}

    def put(self):
        pass

    def delete(self):
        pass

class User_Orders(Resource):

    def get(self,  username):
        orders = orders_util.get_user_orders(username)
        return orders

class Test(Resource):

    productArray = [
    {
      "name": "Dish 1",
      "restId": 101,
      "dishId": 20,
      "actual cost": "200",
      "discounted price": "150",
      "rating": 5
    },

    {
      "name": "Dish 2",
      "restId": 102,
      "dishId": 21,
      "actual cost": "400",
      "discounted price": "375",
      "rating": 4
    },

    {
      "name": "Dish 3",
      "restId": 102,
      "dishId": 25,
      "actual cost": "300",
      "discounted price": "200",
      "rating": 3
    },

    {
      "name": "Dish 4",
      "actual cost": "450",
      "restId": 105,
      "dishId": 40,
      "discounted price": "300",
      "rating": 4
    }
  ]

    productArray2 = [
    {
      "name": "Popular Dish 1",
      "actual cost": "200",
      "discounted price": "150",
      "rating": 5
    },

    {
      "name": "Polular Dish 2",
      "actual cost": "400",
      "discounted price": "375",
      "rating": 4
    },

    {
      "name": "Popular Dish 3",
      "actual cost": "300",
      "discounted price": "200",
      "rating": 3
    },

    {
      "name": "Popular Dish 4",
      "actual cost": "450",
      "discounted price": "300",
      "rating": 4
    }
    ] 

    def get(self):
        return {
            "productArray": self.productArray,
            "productArray2": self.productArray2
        }

class User(Resource):

  user_parser = reqparse.RequestParser()
  user_add_parser = reqparse.RequestParser()
  user_parser.add_argument('Username', required="True", help="Username not specified")
  user_parser.add_argument('First_name', required="True", help="First Name not specified")
  user_parser.add_argument('Last_name', required="True", help="Last Name not specified")
  user_parser.add_argument('Age', required="True", help="Age not specified")
  user_parser.add_argument('Gender', required="True", help="Gender not specified")
  user_parser.add_argument('Email', required="True", help="Email not specified")
  user_parser.add_argument('Password', required="True", help="Passwrd not specified")
  user_parser.add_argument('Account_status', required="True", help="Acc status not specified")
  user_parser.add_argument('previelege', required="True", help="Passwrd not specified")
  user_parser.add_argument('Code', required="True", help="Missing code")
  user_parser.add_argument('Number', required="True", help="Missing Number")
  
  user_add_parser.add_argument('Username', required="True", help="Username not specified")
  user_add_parser.add_argument('house_no', required='True')
  user_add_parser.add_argument('locality', required='True')
  user_add_parser.add_argument('city', required='True')
  user_add_parser.add_argument('state', required='True')
  user_add_parser.add_argument('pincode', required='True')
  user_add_parser.add_argument('Address_name', required='True')

  def post(self):
    user_data = User.user_parser.parse_args()
    print('='*50)
    print(user_data)
    print('='*50)
    user_add_data = User.user_add_parser.parse_args()
    return db.registerUser(user_data, user_add_data), 201

class Restaurant(Resource):

  rest_parser = reqparse.RequestParser()
  rest_phone_parser = reqparse.RequestParser()
  rest_parser.add_argument('restId', required=True, help="Missing Rest ID")
  rest_parser.add_argument('restName', required=True, help="Missing")
  rest_parser.add_argument('email', required=True, help="Missing")
  rest_parser.add_argument('password', required=True, help="Missing")
  rest_parser.add_argument('streetNo', required=True, help="Missing")
  rest_parser.add_argument('locality', required=True, help="Missing")
  rest_parser.add_argument('city', required=True, help="Missing")
  rest_parser.add_argument('state', required=True, help="Missing")
  rest_parser.add_argument('pincode', required=True, help="Missing")
  rest_parser.add_argument('speciality', required=True, help="Missing speciality")
  rest_parser.add_argument('rating')

  rest_phone_parser.add_argument('restId', required="True", help="")
  rest_phone_parser.add_argument('code', required="True")
  rest_phone_parser.add_argument('number', required="True")

  def post(self):
    rest_data = Restaurant.rest_parser.parse_args()
    rest_phone_data = Restaurant.rest_phone_parser.parse_args()

    print('='*50)
    print(rest_data)
    print('='*50)

    return db.registerRestaurant(rest_data, rest_phone_data), 201

class Driver(Resource):

    def post(self):
        data = request.get_json()
        return db.registerDriver(data)

class AddDish(Resource):

    def post(self):
        data = request.get_json()
        dish_data = data['dishData']
        dish_tags = data['dishTags']
        tagsArray = dish_tags.split(' ')
        return db.addDish(dish_data, tagsArray)
  

api.add_resource(Order, '/order/<string:rest_ID>/<string:dish_ID>')
api.add_resource(User_Orders, '/<string:username>/orders')
api.add_resource(Test, '/getProductArray')
api.add_resource(User, '/updateUser')
api.add_resource(Restaurant, '/updateRestaurant')
api.add_resource(Driver, '/updateDriver')
api.add_resource(AddDish, '/addDish')

if __name__ == "__main__":
    app.run(debug=True)