import pandas as pd
import joblib
from scipy.sparse import load_npz
import numpy as np


class MovieRecommendations:
    def __init__(self):

        # self.links = []
        # with open('../backend/ml-25m/links.csv', 'r') as file:
        #     reader = csv.reader(file)
        #     for row in reader:
        #         self.links.append(row)
        self.hashmap = np.load('../backend/ml-25m/movie_tmdb_map.npy', allow_pickle='TRUE').item()
        self.matrix = load_npz('../backend/ml-25m/sparse_matrix.npz')
        self.model = joblib.load('../backend/ml-25m/knnModel.pkl')
        # print(self.hashmap)

    def get_movie_index(self, tmdb_id):

        if tmdb_id in self.hashmap:
            movie = self.hashmap[tmdb_id]
            print(movie)
            return movie + 1
        return "NAN"

    # def get_tmdb_ids(self, movie_indexes):
    #     tmdb_ids = []
    #     print("movie indexes: "+str(movie_indexes))
    #     for i in movie_indexes[0]:
    #         if i != 0:
    #             tmdb_id = int(self.links.loc[self.links.movieId == i, 'tmdbId'].iloc[0])
    #             tmdb_ids.append(tmdb_id)
    #
    #     print(tmdb_ids)
    #     return tmdb_ids

    def get_recommendations(self, data):
        results = {}
        checkIds = []

        for item in data['tmdbId']:
            movie_index = self.get_movie_index(item)
            checkIds.append(item)
            if movie_index != 'NAN':
                distances, indexes = self.model.kneighbors(self.matrix[movie_index], n_neighbors=11)
                # tmdb_ids = self.get_tmdb_ids(indexes)
                reverse_map = {v: k for k, v in self.hashmap.items()}
                # print(reverse_map)
                rec_movie_indices = sorted(list(zip(indexes.squeeze().tolist(), distances.squeeze().tolist())),
                                           key=lambda x: x[1], reverse=True)[:0:-1]

                for val in rec_movie_indices:
                    if reverse_map[val[0]] in results:
                        if val[1] < results[reverse_map[val[0]]]:
                            results[reverse_map[val[0]]] = val[1]
                    results[reverse_map[val[0]]] = val[1]

        results = dict((sorted(results.items(), key=lambda x: x[1])))
        print(results)


        return results, checkIds

        # return "NAN"
