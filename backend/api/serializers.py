from django.contrib.admin import User
from .models import HighestScore 
from django.serializer import serializers

class UserSerializer(serializers.ModelSerializer):
    # Add a write-only password field
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
class HighestScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = HighestScore 
        fields = [ 'user', 'score']