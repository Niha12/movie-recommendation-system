import itertools
import os
import logging
from django.contrib.auth import get_user_model
from django.http import HttpResponse
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from .recommendation import MovieRecommendations
from .serializers import CreateUserSerializer
from django.conf import settings
from django.views.generic import View


# Register a user in the backend to create a token
class CreateUserAPIView(CreateAPIView):
    serializer_class = CreateUserSerializer
    permission_classes = [AllowAny]

    @staticmethod
    def get(request):
        return Response(status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        # We create a token than will be used for future auth
        token = Token.objects.create(user=serializer.instance)
        token_data = {"token": token.key}

        return Response(
            {**serializer.data, **token_data},
            status=status.HTTP_201_CREATED,
            headers=headers
        )


# Log out a user
class LogoutUserAPIView(APIView):
    queryset = get_user_model().objects.all()

    @staticmethod
    def delete(request, format=None):
        # simply delete the token to force a login
        request.user.auth_token.delete()
        return Response(
            status=status.HTTP_200_OK
        )


# Get the token when a user logs in
class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        }, status=status.HTTP_201_CREATED)


# Produce recommendations for the frontend
class Recommendations(APIView):
    movieRecommender = MovieRecommendations()

    @staticmethod
    def get(request):
        return Response(
            status=status.HTTP_200_OK
        )

    # POST request
    def post(self, request, format=None):
        data = request.data

        # If the ratings file needs to be updated
        if data["isUpdate"] == "true":
            self.movieRecommender.update_dataset(data["values"])
            return Response("Updated")
        else:
            # Get a list of IDs as recommendations
            results, checkIds = self.movieRecommender.get_recommendations(data)
            filtered_results = []

            # Checks that the IDs not in the list sent to the backend
            for x in results:
                if x not in checkIds:
                    filtered_results.append(x)

            # Checks if the movies are already rated by the user
            if data['allIds']:
                for item in data['allIds']:
                    if item in filtered_results:
                        filtered_results.remove(item)

            # Removes repeats of IDs
            unique_results = set(filtered_results)
            new_list = []

            # If there are more than 25 movies, only picks the first 25 to sent to frontend
            if len(unique_results) > 25:
                for i, val in enumerate(itertools.islice(unique_results, 25)):
                    new_list.append(val)
            else:
                new_list = list(unique_results)
            formatted_results = {'results': [{'tmdbId': i} for i in new_list]}
            return Response(formatted_results)


class FrontendAppView(View):
    """
    Serves the compiled frontend entry point (only works if you have run `yarn
    run build`).
    """

    def get(self, request):
        print(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html'))
        try:
            with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            logging.exception('Production build of app not found')
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead, or
                run `yarn run build` to test the production version.
                """,
                status=501,
            )
