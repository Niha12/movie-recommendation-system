import itertools

from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken

from .recommendation import MovieRecommendations
from .serializers import CreateUserSerializer


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


class LogoutUserAPIView(APIView):
    queryset = get_user_model().objects.all()

    @staticmethod
    def get(request, format=None):
        # simply delete the token to force a login
        request.user.auth_token.delete()
        return Response(
            status=status.HTTP_200_OK
        )


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


class Recommendations(APIView):
    movieRecommender = MovieRecommendations()

    @staticmethod
    def get(request):
        return Response(
            status=status.HTTP_200_OK
        )

    def post(self, request, format=None):
        data = request.data
        print(data)
        if data["isUpdate"] == "true":
            self.movieRecommender.update_model(data["values"])
            return Response("Updated")
        else:
            results, checkIds = self.movieRecommender.get_recommendations(data)
            filtered_results = []
            for x in results:
                if x not in checkIds:
                    filtered_results.append(x)

            unique_results = set(filtered_results)
            print(unique_results)
            new_list = []
            if len(unique_results) > 40:
                # unique_results = list(unique_results[:40])
                for i, val in enumerate(itertools.islice(unique_results, 40)):
                    new_list.append(val)
            else:
                new_list = list(unique_results)
            formatted_results = {'results': [{'tmdbId': i} for i in new_list]}
            print(formatted_results)
            return Response(formatted_results)

