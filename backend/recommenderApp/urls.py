from django.conf.urls import url
from rest_framework.authtoken.views import obtain_auth_token
from .views import CreateUserAPIView, LogoutUserAPIView, Recommendations, CustomAuthToken


urlpatterns = [
    url(r'^auth/login/$',
        CustomAuthToken.as_view(),
        name='auth_user_login'),
    url(r'^auth/register/$',
        CreateUserAPIView.as_view(),
        name='auth_user_create'),
    url(r'^auth/logout/$',
        LogoutUserAPIView.as_view(),
        name='auth_user_logout'),

    url('suggestions', Recommendations.as_view(), name="recommendations")
]