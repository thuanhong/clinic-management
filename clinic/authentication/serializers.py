from django.contrib.auth import authenticate
from rest_framework import serializers, exceptions

from .models import User, Group, Permission, Profile
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
    '''
    Create user, can add user to group,permissions you grand
    '''
    groups = serializers.JSONField(
        required=False, validators=[validate_group_ids])
    permissions = serializers.JSONField(
        required=False, validators=[validate_permission_ids])
    # Add this field to help validate input email when create new user

    class Meta:
        model = User
        fields = ["id", "username",
                        "created_at", "updated_at", 'groups', 'permissions']
        read_only_fields = ['id']
        depth = 1

    def create(self, validated_data):
        return AuthenticationService.create_new_user(validated_data)

    def update(self, instance, validated_data):
        return AuthenticationService.update_user(instance, validated_data)


class PermissionSerializer(serializers.ModelSerializer):
    '''
    Create permissions
    '''
    class Meta:
        model = Permission
        fields = ["id", "action", "resource"]
        read_only_fields = ['id']
        extra_kwargs = {
            'action': {'required': False, 'validators': []},
            'resource': {'required': False, 'validators': []},
        }


class GroupSerializer(serializers.ModelSerializer):
    '''
    Create groups permissions for user
    '''
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
    '''
    User input username and password to validate firts
    authentication by filter User models and
    check_password by fucntion defaulth django models User
    '''
    username = serializers.CharField(max_length=128)
    password = serializers.CharField(max_length=128, write_only=True)

    class Meta:
        model = User
        fields = ["username",  'password']

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


class ProfileSerializer(serializers.ModelSerializer):
    '''

    '''
    user = UserSerializer(many=False)
    last_name = serializers.CharField(
        required=False, allow_null=True, allow_blank=True)
    age = serializers.IntegerField(source='get_age',
                                   read_only=True)
    gender = serializers.CharField(
        required=False, allow_null=True, allow_blank=True)
    email = serializers.EmailField(
        required=False, allow_null=True, allow_blank=True)
    image = serializers.CharField(
        required=False, allow_null=True, allow_blank=True)
    bio = serializers.CharField(
        required=False, allow_null=True, allow_blank=True)
    location = serializers.CharField(
        required=False, allow_null=True, allow_blank=True)
    title = serializers.CharField(
        required=False, allow_blank=True)

    class Meta:
        model = Profile
        fields = ["user", "first_name", "last_name", 'age', "gender",
                  'image', 'bio', 'location', 'birth_date', 'title', 'email']
        read_only_fields = ['id', 'age']
        depth = 1

    def create(self, validated_data):
        email = validated_data['email']
        if AuthenticationService.is_email_exists(email):
            raise serializers.ValidationError(
                detail="Email is already exists. Please check again!")
        if validated_data['title'] is not None and (validated_data['title'].strip() == 'doctor' or validated_data['title'].strip() == 'nurse'):
            if validated_data['title'] == 'doctor':
                validated_data['user'].update({'groups': ['2']})
                validated_data['user'].move_to_end('groups', last=False)
            if validated_data['title'] == 'nurse':
                validated_data['user'].update({'groups': ['3']})
                validated_data['user'].move_to_end('groups', last=False)
            print(validated_data['user'])
        user = AuthenticationService.create_new_user(
            validated_data.pop('user'), validated_data['email'])
        profile = Profile(**validated_data)
        profile.user = user
        profile.save()
        return profile
    # def validate(self,data):

    #     """
    #     Check validate title
    #     """
    #     if data['title'] is not None and data['title'].strip() == 'doctor':
    #         if data['title'] =='doctor':
    #             print(data.get('user'))
    #             print(data['user'])
    #             # self.user.groups = ['2']
    #             return data
    #         if data['title'] == 'nurse':
    #             print(data.get('user'))
    #             data['user'].update( {'groups':['3']})
    #             data['user'].move_to_end('groups', last=False)

    #             print(data['user'])
    #             # self.user.groups = ['2']
    #             return data


class ChangePasswordSerializer(serializers.Serializer):
    model = User

    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
