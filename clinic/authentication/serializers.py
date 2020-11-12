from django.contrib.auth import authenticate
from rest_framework import serializers, exceptions

from .models import User, Group, Permission
from .services import AuthenticationService

def validate_list_value(value):
    if not isinstance(value, list):
        raise serializers.ValidationError(
            detail="The field value must be an array. Please check again!")


def validate_group_ids(value):
    if value:
        validate_list_value(value)
        invalid_ids = AuthenticationService.find_invalid_group_ids(value)
        if len(invalid_ids) > 0:
            raise serializers.ValidationError(
                detail="There is invalid group ID(s) %s. Please check again!" % invalid_ids)
    return value


def validate_permission_ids(value):
    if value:
        validate_list_value(value)
        invalid_ids = AuthenticationService.find_invalid_permission_ids(
            value)
        if len(invalid_ids) > 0:
            raise serializers.ValidationError(
                detail="There is invalid permission ID(s) %s. Please check again!" % invalid_ids)
    return value


def validate_user_ids(value):
    if value:
        validate_list_value(value)
        invalid_ids = AuthenticationService.find_invalid_user_ids(
            value)
        if len(invalid_ids) > 0:
            raise serializers.ValidationError(
                detail="There is invalid user ID(s) %s. Please check again!" % invalid_ids)
    return value


class UserSerializer(serializers.ModelSerializer):
    # Add this field to help validate input email when create new user
    groups = serializers.JSONField(
        required=False, validators=[validate_group_ids])
    permissions = serializers.JSONField(
        required=False, validators=[validate_permission_ids])
    email = serializers.EmailField()
    class Meta:
        model = User
        fields = ["id", "username", 'email', 'password',
                        "created_at", "updated_at",'groups','permissions']
        read_only_fields = ['id']
        extra_kwargs = {
            'password': {'write_only': True},
        }
        depth = 1

    def create(self, validated_data):
        return AuthenticationService.create_new_user(validated_data)

    def update(self, instance, validated_data):
        return AuthenticationService.update_user(instance, validated_data)

class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ["id", "action", "resource"]
        read_only_fields = ['id']
        extra_kwargs = {
            'action': {'required': False, 'validators': []},
            'resource': {'required': False, 'validators': []},
        }


class GroupSerializer(serializers.ModelSerializer):
    users = serializers.JSONField(
        required=False, validators=[validate_user_ids])
    permissions = serializers.JSONField(
        required=False, validators=[validate_permission_ids])
    name = serializers.CharField(required=True)

    class Meta:
        model = Group
        fields = ["id", "name", "users",
                  "permissions", "created_at", "updated_at"]
        read_only_fields = ['id']
        depth = 1

    def create(self, validated_data):
        return AuthenticationService.create_new_group(validated_data)

    def update(self, instance, validated_data):
        return AuthenticationService.update_group(instance, validated_data)

    def validate_name(self, value):
        if AuthenticationService.is_group_name_exists(value):
            raise serializers.ValidationError(
                detail="Group name is already exists. Please check again!")
        return value

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=128)
    password = serializers.CharField(max_length=128, write_only=True)

    # token = serializers.CharField(max_length=128)

    class Meta:
        model = User
        fields = ["id", "username",  'password']

    def validate(self, data):
        username = data.get("username", None)
        password = data.get("password", None)
        if (username is None) or (password is None):
            raise exceptions.AuthenticationFailed(
                'username and password required')
        user = User.objects.filter(username=username).first()
        if(user is None or not user.check_password(password)):
            raise exceptions.AuthenticationFailed(
                'user not found or password wrong')
        return user
    pass