from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import User

class UserAPITests(APITestCase):
    def setUp(self):
        # Create some initial users for testing
        self.user1 = User.objects.create(name="Alice", date_of_birth="1990-01-01")
        self.user2 = User.objects.create(name="Bob", date_of_birth="1992-05-10")
        self.user_list_url = reverse('user-list-create')

    def test_list_users(self):
        """Test listing all users."""
        response = self.client.get(self.user_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results', response.data)
        self.assertIsInstance(results, list)
        self.assertGreaterEqual(len(results), 2)

    def test_search_user_by_id(self):
        """Test retrieving a single user by ID."""
        url = reverse('user-detail', args=[self.user1.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.user1.id)
        self.assertEqual(response.data['name'], self.user1.name)

    def test_retrieve_non_existent_user(self):
        """Test retrieving a user that does not exist should return 404."""
        url = reverse('user-detail', args=[9999])  # ID that doesn't exist
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_user(self):
        """Test creating a new user."""
        new_user_data = {
            "name": "Charlie",
            "date_of_birth": "1995-10-20"
        }
        response = self.client.post(self.user_list_url, new_user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('id', response.data)
        self.assertEqual(response.data['name'], "Charlie")
        # Verify user is created in the database
        self.assertTrue(User.objects.filter(name="Charlie").exists())

    def test_update_user(self):
        """Test updating an existing user."""
        url = reverse('user-detail', args=[self.user1.id])
        updated_data = {
            "name": "Alice Updated",
            "date_of_birth": "1990-01-01"
        }
        response = self.client.put(url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user1.refresh_from_db()
        self.assertEqual(self.user1.name, "Alice Updated")

    def test_partial_update_user(self):
        """Test partially updating (PATCH) a user."""
        url = reverse('user-detail', args=[self.user2.id])
        response = self.client.patch(url, {"name": "Bobby"}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user2.refresh_from_db()
        self.assertEqual(self.user2.name, "Bobby")

    def test_delete_user(self):
        """Test deleting a user."""
        url = reverse('user-detail', args=[self.user1.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        # Verify the user is gone
        self.assertFalse(User.objects.filter(id=self.user1.id).exists())
