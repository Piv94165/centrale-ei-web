from pymongo import MongoClient
from bson.objectid import ObjectId
from collections import OrderedDict
import requests
import numpy as np
from more_itertools import sort_together

id_user = "629f485825c978cfea8b715b"

# def term_movie_incidence_dico (Movies,terms):
#     #Movies : dico {id_movie : [terms]}
#     #terms : liste [terms]
#     term_movie_matrix = {}
#     for term in terms:
#         term_movie_matrix[term] = []
#         for movie in Movies:
#             if term in Movies[movie]:
#                  term_movie_matrix[term].append(1)
#             else:
#                 term_movie_matrix[term].append(0)
#     return term_movie_matrix

def term_movie_incidence_matrix (Movies,terms):
    #Movies : dico {id_movie : [terms]}
    #terms : liste [terms]
    n_movies = len(Movies.keys()) 
    n_terms = len(terms)
    term_movie_matrix = np.zeros((n_movies,n_terms))
    for j in range(n_terms):
        i=0
        for movie in Movies:
            movie_genres = []
            for genre in Movies[movie]:
                movie_genres.append(genre[0])
            if terms[j] in movie_genres: 
                term_movie_matrix[(i,j)] = 1
            i+=1
    return term_movie_matrix 


def user_mean_vector(ratings_user, Movies, terms):
    #ratings_user : la liste des object ratings du user
    #Movies : collection Movies
    #terms : termes utilisés pour la recommandation

    n=len(terms)
    user_vector = np.zeros((1,n))
    for rating in ratings_user:
        rating_movies = Movies.find({"_id":ObjectId(rating["id_movie"])})
        for movie in rating_movies:
            movie_genres = []
            for genre in movie["genre"]:
                movie_genres.append(genre[0])
            for i in range(n):
                if terms[i] in movie_genres: 
                    user_vector[(0,i)] += int(rating["rating"])
    #On retroune une moyenne des notes pour chaque term normalisé (d'où la division par 5)
    return user_vector/(5*len(list(ratings_user.clone())))


def find_ratings_of_a_user(id_user):
    #Connexion à la base de données MongoDB
    myclient = MongoClient('mongodb://group1:BZQb6y8mLUfYd4nw@cs2022.lmichelin.fr:27017/group1?ssl=true')

    #Récupération de la base de données
    mydb = myclient["group1"]
    #Récupération de la table Ratings et Scores
    myratings = mydb["ratings"]
    myscores = mydb["scores"]
    mymovies = mydb["movies"]

    myquery = {"id_user": ObjectId(id_user)}
    #Liste des films notés par l'utilisateur id_user
    user_ratings = myratings.find(myquery)

    #Représentation des films
    inverted_index = {}
    genres = ["Action","Adventure","Animation","Comedy","Crime","Documentary","Drama","Family","Fantasy","History","Horror","Music","Mystery","Romance","Science Fiction","TV Movie", "Thriller", "War", "Western"]
    movies = mymovies.find({})
    movies_genre = {}
    movies_list = []
    for movie in movies:
        movies_list.append(movie["_id"])
        movies_genre[movie["_id"]] = movie["genre"] 
    inverted_index = term_movie_incidence_matrix(movies_genre,genres)
    user_vector = user_mean_vector(user_ratings,mymovies,genres)
    scores = np.dot(inverted_index, np.transpose(user_vector))
    ordered = sort_together([scores,movies_list])
    ordered_movies = list(ordered[1])
    ordered_scores = list(ordered[0])
    print(ordered_scores)
    # print( ordered_movies)
    
    #On stocke dans la base de données les 20 meilleurs scores
    for i in range(20):
        x = myscores.update_one({"id_movie": ordered_movies[-1*i], "id_user": id_user}, {"$set":{"id_movie": ordered_movies[-1*i], "id_user": id_user, "score": str(float(ordered_scores[-1 * i]))}}, True)
        print(x)

    # for movie in user_ratings:
    #     x = myscores.update_one({"id_movie": movie["id_movie"], "id_user": movie["id_user"]}, {"$set":{"id_movie": movie["id_movie"], "id_user": movie["id_user"], "score": movie["rating"]}}, True)
        
    #     # coll.update(key, data, upsert=True)
    #     print(x)
    

find_ratings_of_a_user(id_user)