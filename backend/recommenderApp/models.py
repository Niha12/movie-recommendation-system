from django.db import models


# Create your models here.
class Movie(models.Model):
    movie_id = models.IntegerField(default=0, primary_key=True)
    tmdb_id = models.IntegerField(default=0)
    movie_name = models.CharField(max_length=200)
    genre = models.CharField(max_length=200)


