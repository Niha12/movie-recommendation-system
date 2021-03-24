from django.db import models


# Create your models here.
class Movie(models.Model):
    tmdb_id = models.IntegerField(default=0, primary_key=True)
    movie_id = models.IntegerField(default=0)
    movie_name = models.CharField(max_length=200)
    rating = models.IntegerField(default=0)

    # def __str__(self):
    #     return self.tmdb_id

# class SimilarMovies(models.Model):
