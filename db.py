from flask_restful import Resource
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
    details = dict()
    details['restId'] =  data[0]
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

def updateOrder(orderData):
    pass



