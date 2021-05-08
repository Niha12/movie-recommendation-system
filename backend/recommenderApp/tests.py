from django.test import TestCase, Client
from django.urls import reverse
import json


# Create your tests here.


class CreateUserAPIView(TestCase):
    def test_register_view_exists(self):
        client = Client()
        response = client.get(reverse("auth_user_create"))
        self.assertEqual(response.status_code, 200)

    def test_register(self):
        client = Client()
        response = client.post(reverse("auth_user_create"), data={"username": "username1", "password": "password1"})
        self.token = response.data.get("token")
        self.assertEqual(response.status_code, 201)


class UserChangePassword(TestCase):
    def setUp(self):
        client = Client()
        response = client.post(reverse("auth_user_create"), data={"username": "username1", "password": "password1"})
        self.token = response.data.get("token")

    def test_change_password(self):
        client = Client(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.patch(reverse("auth_user_changepassword"), data={"old_password": "password1",
                                                                           "new_password": "password3"},
                                content_type="application/json")
        self.assertEqual(response.status_code, 200)


class TestRecommendations(TestCase):
    def setUp(self):
        client = Client()
        response = client.post(reverse("auth_user_create"), data={"username": "username1", "password": "password1"})
        self.token = response.data.get("token")

    # Tests recommendations for a certain movie
    def test_recommendations(self):
        client = Client(HTTP_AUTHORIZATION='Token ' + self.token)
        request = {'tmdbId': [99861], 'isUpdate': "false", 'allIds': [99861]}
        result = {'results': [{'tmdbId': 127585}, {'tmdbId': 118340}, {'tmdbId': 271110},
                              {'tmdbId': 1771}, {'tmdbId': 24428}, {'tmdbId': 68721},
                              {'tmdbId': 100402}, {'tmdbId': 102899}, {'tmdbId': 76338}]}

        response = client.post(reverse("recommendations"), data=json.dumps(request), content_type="application/json")
        self.assertEqual(response.data, result)


class TestLogoutUserAPIView(TestCase):
    def setUp(self):
        client = Client()
        response = client.post(reverse("auth_user_create"), data={"username": "username1", "password": "password1"})
        self.token = response.data.get("token")

    def test_logout(self):
        client = Client(HTTP_AUTHORIZATION='Token ' + self.token)
        response = client.delete(reverse("auth_user_logout"))
        print(response)
        self.assertEqual(response.status_code, 200)
