from rest_framework import generics
from .models import User
from .serializers import UserSerializer

class UserListCreateAPIView(generics.ListCreateAPIView):
    """
    GET /users: Returns a paginated list of users.
    POST /users: Creates a new user.
    """
    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer

    # Pagination is handled automatically by ListCreateAPIView as configured in settings.


class UserRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET /users/:id: Returns the user with the given id.
    PUT /users/:id: Updates the user with the given id.
    DELETE /users/:id: Deletes the user with the given id.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'
