from flask_restful import Resource
import mysql.connector as mysqlcon
import pandas as pd
import sys


def registerUser(user_data, add_data):

    conn = mysqlcon.connect(host= "localhost", user = "root", password = "mysql@1234")
    cur = conn.cursor(buffered=True)

    cur.execute('use food_delivery_app')
    try:
        cur.callproc('updateUserTable', list(user_data.values()))
    except:
        return {"Message": "Username already taken"}
    finally:
        pass

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

def addDish(dish_data):

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

    return {"Message": f"Dish {dish_data['dishName']} updated successfully!"}

def getRestaurants(city):

    conn = mysqlcon.connect(host= "localhost", user = "root", password = "mysql@1234")
    cur = conn.cursor(buffered=True)

    cur.execute('use food_delivery_app')
    cur.callproc('showRest', [city])
    rests = []
    for result in cur.stored_results():
        data = result.fetchall()
    # print(data)
    for data in data:
            rest = dict()
            rest['restId'] = data[0]
            rest['restName'] = data[1]
            rest['restSpeciality'] = data[2]
            rest['restRating'] = data[3]

            rests.append(rest) 
    return rests

def getDishes(restID):
    conn = mysqlcon.connect(host= "localhost", user = "root", password = "mysql@1234")
    cur = conn.cursor(buffered=True)

    cur.execute('use food_delivery_app')
    cur.callproc('showRestDish', [restID])

    for result in cur.stored_results():
        data = result.fetchall()
    
    dishes = []
    for data in data:
        dish = dict()
        dish['restId'] = data[0]
        dish['dishId'] = data[1]
        dish['dishName'] = data[2]
        dish['dishActualCost'] = data[3]
        dish['dishDiscCost'] = data[6]
        dish['dishRating'] = data[7]

        dishes.append(dish)
    
    return dishes

def showDish(restId, dishId):
    conn = mysqlcon.connect(host= "localhost", user = "root", password = "mysql@1234")
    cur = conn.cursor(buffered=True)

    cur.execute('use food_delivery_app')
    cur.callproc('showDish', [restId, dishId])

    for result in cur.stored_results():
        data = result.fetchall()
    data = data[0]

    print(data)
    details = dict()
    details['restId'] =  data[0]
    details['restName'] = data[8]
    details['dishId'] = data[1]
    details['dishName'] = data[2]
    details['dishActualCost'] = data[3]
    details['dishDesc'] = data[4]
    details['dishCount'] = data[5]
    details['dishDiscCost'] = data[6]
    details['dishRating'] = data[7]

    return details

def getAdminStats():
    conn = mysqlcon.connect(host= "localhost", user = "root", password = "mysql@1234")
    cur = conn.cursor(buffered=True)

    cur.execute('use food_delivery_app')
    cur.callproc('adminStats')
    for result in cur.stored_results():
        stats = result.fetchall()
    print(stats)
    adminStats = dict()
    adminStats['restCount'] = stats[0][0]
    adminStats['userCount'] = stats[0][1]
    adminStats['orderCount'] = stats[0][2]
    if stats[0][3] is None:
        adminStats['dishesCount'] = 0
    else:
        adminStats['dishesCount'] = int(stats[0][3])
    if stats[0][4] is None:
        adminStats['turnover'] = 0
    else:
        adminStats['turnover'] = stats[0][4]
    if stats[0][5]==None:
        adminStats['profit'] = 0
    else:
        adminStats['profit'] = stats[0][5]
    return adminStats

def login(username, password):
    conn = mysqlcon.connect(host= "localhost", user = "root", password = "mysql@1234")
    cur = conn.cursor(buffered=True)

    cur.execute('use food_delivery_app')
    cur.callproc('userLogin', [username, password])
    for result in cur.stored_results():
        user = result.fetchall()
    
    userData = dict()
    if user:
        userData['username'] = user[0][0]
        userData['firstName'] = user[0][1]
        userData['lastName'] = user[0][2]
        userData['age'] = user[0][3]
        userData['gender'] = user[0][4]
        userData['email'] = user[0][5]
        userData['privelege'] = user[0][8]
        userData['phoneNumber'] = user[0][10]
        userData['houseNo'] = user[0][12]
        userData['locality'] = user[0][13]
        userData['city'] = user[0][14]
        userData['state'] = user[0][15]
        userData['pincode'] = user[0][16]
        userData['addressName'] = user[0][17]
    else:
        userData['Message'] = "Invalid Credentials"


    return userData


def restLogin(restId, password):
    conn = mysqlcon.connect(host= "localhost", user = "root", password = "mysql@1234")
    cur = conn.cursor(buffered=True)

    cur.execute('use food_delivery_app')
    cur.callproc('restLogin', [restId, password])
    for result in cur.stored_results():
        rest = result.fetchall()
    
    print(rest)
    restData = dict()
    if not rest:
        restData['Message'] = 'Invalid Credentials'
    else:
        restData['restId'] = rest[0][0]
        restData['restName'] = rest[0][1]
        restData['email'] = rest[0][2]
        restData['streetNo'] = rest[0][4]
        restData['locality'] = rest[0][5]
        restData['city'] = rest[0][6]
        restData['state'] = rest[0][7]
        restData['pincode'] = rest[0][8]
    
    return restData

def updateOrder(arr, orderDishes):
    conn = mysqlcon.connect(host= "localhost", user = "root", password = "mysql@1234")
    cur = conn.cursor(buffered=True)

    cur.execute('use food_delivery_app')
    print("Total", arr[16])
    cur.callproc('updateOrder', [arr[0], arr[1], arr[2], arr[3], arr[4], float(arr[5]), arr[6], arr[7], arr[8], arr[9], arr[10], arr[11], arr[12], arr[13], arr[14], arr[15], arr[16]])
    
    username = arr[1]
    cur.callproc('getLatestOrder', [username])
    for result in cur.stored_results():
        lastOrder = result.fetchall()
    orderId = lastOrder[0][0]
    
    print("Order Sucsessful")
    for dish in orderDishes:
        print(dish)
        cur.callproc('updateOrderDishes', [orderId, dish['restId'], dish['dishId'], dish['quantity'], dish['dishName'], dish['dishPrice']])
    
    conn.commit()

def getOrders(username):
    conn = mysqlcon.connect(host= "localhost", user = "root", password = "mysql@1234")
    cur = conn.cursor(buffered=True)

    ordersList = []
    cur.execute('use food_delivery_app')
    cur.callproc('getOrders', [username])
    for result in cur.stored_results():
        orders = result.fetchall()

    for order in orders:
        ordersData = dict()
        ordersData['orderId'] = order[0]
        ordersData['restId'] = order[1]
        ordersData['restName'] = order[17]
        ordersData['orderStatus'] = order[9]
        ordersData['orderTotal'] = order[6]
        ordersData['dateTime'] = str(order[7])

        order_dishes = []
        order_Id = order[0]
        cur.callproc('getOrderDishes', [order_Id])
        
        for result in cur.stored_results():
            dishes = result.fetchall()
        
        for dish in dishes:
            dishObj = dict()
            dishObj['orderId'] = dish[0]
            dishObj['restId'] = dish[1]
            dishObj['dishId'] = dish[2]
            dishObj['quantity'] = dish[3]
            dishObj['dishName'] = dish[4]
            dishObj['dishPrice'] = dish[5]
            order_dishes.append(dishObj)
        
        ordersList.append({"orderDetails":ordersData, "orderDishes": order_dishes})
    
    return ordersList

def getLatestOrderId(username):
    conn = mysqlcon.connect(host= "localhost", user = "root", password = "mysql@1234")
    cur = conn.cursor(buffered=True)

    cur.execute('use food_delivery_app')
    cur.callproc('getLatestOrder', [username])
    for result in cur.stored_results():
        data = result.fetchall()
    orderId = data[0][0]
    return orderId

def updateOrderStatus(orderId, status):
    conn = mysqlcon.connect(host= "localhost", user = "root", password = "mysql@1234")
    cur = conn.cursor(buffered=True)
    cur.execute('use food_delivery_app')

    status = str(status)
    cur.callproc('updateOrderStatus', [orderId, status])

    conn.commit()
    conn.close()

    return {"Message": f"Order Status successfully updated to {status}"}

def getOrderStatus(orderId):
    conn = mysqlcon.connect(host= "localhost", user = "root", password = "mysql@1234")
    cur = conn.cursor(buffered=True)
    cur.execute('use food_delivery_app')

    cur.callproc('getOrderStatus', [orderId])
    for result in cur.stored_results():
        data = result.fetchall()
    orderStatus = data[0][0]
    return orderStatus
