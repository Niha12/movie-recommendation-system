from django.conf.urls import url
from .views import CreateUserAPIView, LogoutUserAPIView, Recommendations, CustomAuthToken, FrontendAppView

# Url routing
urlpatterns = [
    url(r'^backend/auth/login/$',
        CustomAuthToken.as_view(),
        name='auth_user_login'),
    url(r'^backend/auth/register/$',
        CreateUserAPIView.as_view(),
        name='auth_user_create'),
    url(r'^backend/auth/logout/$',
        LogoutUserAPIView.as_view(),
        name='auth_user_logout'),

    url('backend/suggestions', Recommendations.as_view(), name="recommendations"),

    # Anything else is redirected to frontend
    url(r'^', FrontendAppView.as_view()),
]