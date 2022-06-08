from pymongo import MongoClient

myclient = MongoClient('mongodb://group1:BZQb6y8mLUfYd4nw@cs2022.lmichelin.fr:27017/group1?ssl=true')

# myclient = MongoClient(
#     "mongodb://group1:BZQb6y8mLUfYd4nw@cs2022.lmichelin.fr:27017/group1?ssl=true")
mydb = myclient["group1"]
mycol = mydb["movies"]

myquery = {"title": "Fantastic Beasts: The Secrets of Dumbledore"}

mydoc = mycol.find(myquery)
mydoc = mycol.find(myquery)

for x in mydoc:
    print(x)
