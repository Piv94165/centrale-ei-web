from pymongo import MongoClient
from bson.objectid import ObjectId
from collections import OrderedDict


def find_ratings_of_a_user(id_user):
    #Connexion à la base de données MongoDB
    myclient = MongoClient('mongodb://group1:BZQb6y8mLUfYd4nw@cs2022.lmichelin.fr:27017/group1?ssl=true')

    #Récupération de la base de données
    mydb = myclient["group1"]
    #Récupération de la table Ratings et Scores
    myratings = mydb["ratings"]
    myscores = mydb["scores"]

    myquery = {"id_user": ObjectId(id_user)}
    #Liste des films notés par l'utilisateur id_user
    mydoc = myratings.find(myquery)
    for movie in mydoc:
        x = myscores.update_one({"id_movie": movie["id_movie"], "id_user": movie["id_user"]}, {"$set":{"id_movie": movie["id_movie"], "id_user": movie["id_user"], "score": movie["rating"]}}, True)
        
        # coll.update(key, data, upsert=True)
        print(x)
    

find_ratings_of_a_user("629f485825c978cfea8b715b")