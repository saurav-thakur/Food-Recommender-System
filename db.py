import mysql.connector as mysqlcon
import pandas as pd


def registerUser(user_data, add_data):

    conn = mysqlcon.connect(host= "localhost", user = "root", password = "mysql@1234")
    cur = conn.cursor(buffered=True)

    cur.execute('use food_delivery_app')
    cur.callproc('updateUserTable', list(user_data.values()))
    print(list(add_data.values()))
    cur.callproc('updateUserAddTable', list(add_data.values()))
    conn.commit()
    conn.close()
    return {"Message": f"User {user_data['First_name']} {user_data['Last_name']} registered sucsessfully!"}

def registerRestaurant(rest_data, rest_phone_data):


    conn = mysqlcon.connect(host= "localhost", user = "root", password = "mysql@1234")
    cur = conn.cursor(buffered=True)

    cur.execute('use food_delivery_app')
    cur.callproc('updateRestTable', list(rest_data.values()))
    cur.callproc('updateRestPhone', list(rest_phone_data.values()))
    conn.commit()
    conn.close()
    return {"Message": f"Restaurant {rest_data['restName'] } registered sucsessfully!"}

def registerDriver(data):

    conn = mysqlcon.connect(host= "localhost", user = "root", password = "mysql@1234")
    cur = conn.cursor(buffered=True)

    cur.execute('use food_delivery_app')
    cur.callproc('updateDriver', list(data.values()))

    conn.commit()
    conn.close()

    return {"Message": f"Driver {data['First_name']} {data['Last_Name']} registered successfully!"}

def addDish(dish_data, tagsArray):

    conn = mysqlcon.connect(host= "localhost", user = "root", password = "mysql@1234")
    cur = conn.cursor(buffered=True)

    cur.execute('use food_delivery_app')
    cur.callproc('updateDishTable', list(dish_data.values()))
    
    # for tag in tagsArray:
    #     a = []
    #     a.append(dish_data['Rest_ID'])
    #     a.append(dish_data['Dish_ID'])
    #     a.append(tag)
    #     print('='*50)
    #     print(a)
    #     print('='*50)
    #     cur.callproc('updateDishTags', a)

    conn.commit()
    conn.close()

    return {"Message": f"Dish {dish_data['Dish_Name']} updated successfully!"}