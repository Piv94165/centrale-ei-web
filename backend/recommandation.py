from pymongo import MongoClient
from collections import OrderedDict


def find_ratings_of_a_user(id_user):
    #Connexion à la base de données MongoDB
    myclient = MongoClient('mongodb://group1:BZQb6y8mLUfYd4nw@cs2022.lmichelin.fr:27017/group1?ssl=true')

    #Récupération de la base de données
    mydb = myclient["group1"]
    #Récupération de la table Ratings
    mycol = mydb["ratings"]

    myquery = {"id_user": id_user}
    #Liste des films notés par l'utilisateur id_user
    mydoc = mycol.find(myquery)
    
