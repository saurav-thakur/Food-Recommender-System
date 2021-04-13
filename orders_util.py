username = "dskk"
dskk_orders = []

def update_order(rest_ID, dish_ID, username,time, date, bill):
    if username == "dskk":
        order = {
            "order1": {
                "rest_ID" : rest_ID,
                "dish_ID" : dish_ID,
                "time" : time,
                "date" : date,
                "bill" : bill
            }
        }

        dskk_orders.append(order)

def get_user_orders(username):
    if username == "dskk":
        return dskk_orders


