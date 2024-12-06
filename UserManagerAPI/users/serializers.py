from rest_framework import serializers
from users.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'date_of_birth', 'created_on']
        read_only_fields = ['id', 'created_on']
