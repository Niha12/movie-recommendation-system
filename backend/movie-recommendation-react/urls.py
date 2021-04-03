from django.urls import path
from .views import index

urlpatterns = [
    path('login', index),
    path('signup', index),
    path('forgotpassword', index),
    path('main', index),
    path('profile/settings', index),
    path('movie_details', index),
    path('cast', index),
    path('recommendations', index),
    path('watchlater', index),
    path('profile/ratings', index),
    path('profile/friends', index),
    path('ratedmovies', index),
    path('genres', index)
]