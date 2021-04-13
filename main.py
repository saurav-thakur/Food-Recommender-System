from flask import Flask, request
from flask_restful import Api, Resource, reqparse
from flask_jwt import JWT, jwt_required
import orders_util

app = Flask(__name__)
api = Api(app)

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


api.add_resource(Order, '/order/<string:rest_ID>/<string:dish_ID>')
api.add_resource(User_Orders, '/<string:username>/orders')

if __name__ == "__main__":
    app.run(debug=True)