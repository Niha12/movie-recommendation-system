from django.urls import path
from .views import index

urlpatterns = [
    path('login', index),
    path('signup', index),
    path('main', index),
    path('profile', index),
    path('movie_details', index)
]