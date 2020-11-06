from django.contrib.auth import authenticate
from rest_framework import serializers, exceptions

from .models import User
from .services import UserService

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=128)
    password = serializers.CharField(max_length=128, write_only=True)

    # token = serializers.CharField(max_length=128)


    class Meta:
        model = User
        fields = [ "id","username",  'password']

    def validate(self, data):
        username = data.get("username", None)
        password = data.get("password", None)
        if (username is None) or (password is None):
            raise exceptions.AuthenticationFailed(
                'username and password required')
        user = User.objects.filter(username=username).first()
        if(user is None):
            raise exceptions.AuthenticationFailed('user not found')

        if (not user.check_password(password)):
            raise exceptions.AuthenticationFailed('wrong password')
        return user
    pass

class UserSerializer(serializers.ModelSerializer):
    # Add this field to help validate input email when create new user


    class Meta:
        model = User
        fields = ["id", "username", 'email', 'password',
                        "created_at", "updated_at"]
        read_only_fields = ['id']
        extra_kwargs = {
            'password': {'write_only': True},
        }
        depth = 1

    def create(self, validated_data):
        return UserService.create_new_user(validated_data)

    def update(self, instance, validated_data):
        return UserService.update_user(instance, validated_data)
