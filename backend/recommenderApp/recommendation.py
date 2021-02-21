
import pandas as pd
import joblib
from scipy.sparse import load_npz
import numpy as np

class MovieRecommendations:
    def __init__(self):
        self.links = pd.read_csv("../backend/ml-25m/links.csv",
                                 usecols=["movieId", "tmdbId"],
                                 dtype={"movieId": "int32"})
        # self.links = []
        # with open('../backend/ml-25m/links.csv', 'r') as file:
        #     reader = csv.reader(file)
        #     for row in reader:
        #         self.links.append(row)
        self.hashmap = np.load('../backend/ml-25m/movie_tmdb_map.npy', allow_pickle='TRUE').item()
        self.matrix = load_npz('../backend/ml-25m/sparse_matrix.npz')
        self.model = joblib.load('../backend/ml-25m/knnModel.pkl')

    def get_movie_index(self, tmdb_id):

        movie_id = self.links.loc[self.links.tmdbId == tmdb_id, 'movieId'].iloc[0]
        movie = self.hashmap[tmdb_id]
        print(movie)
        return movie + 1

    def get_tmdb_ids(self, movie_indexes):
        tmdb_ids = []
        print("movie indexes: "+str(movie_indexes))
        for i in movie_indexes[0]:
            if i != 0:
                tmdb_id = int(self.links.loc[self.links.movieId == i, 'tmdbId'].iloc[0])
                tmdb_ids.append(tmdb_id)

        print(tmdb_ids)
        return tmdb_ids

    def get_recommendations(self, tmdbId):
        results = []
        movie_index = self.get_movie_index(tmdbId)
        distances, indexes = self.model.kneighbors(self.matrix[movie_index], n_neighbors=11)
        tmdb_ids = self.get_tmdb_ids(indexes)
        reverse_map = {v: k for k, v in self.hashmap.items()}
        # print(reverse_map)
        for i in indexes[0]:
            results.append(reverse_map[i])
        return results
