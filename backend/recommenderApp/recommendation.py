from datetime import time
from shutil import copyfile

import pandas as pd
import joblib
from scipy.sparse import load_npz, csr_matrix
import numpy as np


class MovieRecommendations:
    def __init__(self):

        self.hashmap = np.load('./ml-25m/movie_tmdb_map.npy', allow_pickle='TRUE').item()
        self.matrix = load_npz('./ml-25m/sparse_matrix.npz')
        self.model = joblib.load('./ml-25m/knnModel.pkl')
        # self.path_ratings_src = "../backend/ml-25m/ratings-new.csv"
        # self.path_ratings_dest = "../backend/ml-25m/ratings.csv"
        # copyfile(self.path_ratings_dest, self.path_ratings_src)

    def get_movie_index(self, tmdb_id):

        if tmdb_id in self.hashmap:
            movie = self.hashmap[tmdb_id]
            # print(movie)
            return movie
        return "NAN"

    def get_recommendations(self, data):
        results = {}
        checkIds = []
        print(data)
        for item in data['tmdbId']:
            movie_index = self.get_movie_index(item)
            checkIds.append(item)
            if movie_index != 'NAN':
                movie = self.matrix[movie_index]
                distances, indexes = self.model.kneighbors(movie, n_neighbors=11)
                # tmdb_ids = self.get_tmdb_ids(indexes)
                reverse_map = {v: k for k, v in self.hashmap.items()}
                # print(reverse_map)
                rec_movie_indices = sorted(list(zip(indexes.squeeze().tolist(), distances.squeeze().tolist())),
                                           key=lambda x: x[1], reverse=True)[:0:-1]
                # print("results: " + str(rec_movie_indices))
                for val in rec_movie_indices:
                    if reverse_map[val[0]] in results:
                        if val[1] < results[reverse_map[val[0]]]:
                            results[reverse_map[val[0]]] = val[1]
                    results[reverse_map[val[0]]] = val[1]

        results = dict((sorted(results.items(), key=lambda x: x[1])))
        # print(results)

        return results, checkIds

    def update_model(self, data):
        movieId = self.get_movie_index(data[1])
        with open(self.path_ratings_src, 'a') as fd:
            fd.write(str(data[0] + 'A') + ',' + str(movieId) + ',' + str(data[2]) + ',' + str(time()) + '\n')
