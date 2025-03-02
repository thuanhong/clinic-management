import jwt
from django.shortcuts import render

from django.conf import settings
from django.shortcuts import render
from django.views.decorators.csrf import csrf_protect
from rest_framework import viewsets, status, permissions, exceptions, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated

from .serializers import UserSerializer, UserLoginSerializer, GroupSerializer, PermissionSerializer, ProfileSerializer, ChangePasswordSerializer
from .models import User, Group, Permission, Profile
from .utils import generate_access_token, generate_refresh_token

# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    # permission allow on develop
    permission_classes = [(permissions.AllowAny)]
    serializer_class = UserSerializer
    queryset = User.objects.all()
    http_method_names = ['get', 'patch', 'post']


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    permission_classes = [(permissions.AllowAny)]
    http_method_names = ['get', 'post', 'patch', 'delete']
    serializer_class = GroupSerializer
    pass


class PermissionViewSet(viewsets.ModelViewSet):
    permission_classes = [(permissions.AllowAny)]
    queryset = Permission.objects.all()
    http_method_names = ['get', 'post', 'patch']
    serializer_class = PermissionSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    permission_classes = [(permissions.AllowAny)]
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    http_method_names = ['get', 'patch', 'post']


@api_view(['POST'])
@authentication_classes([])  # pass Authentication header
@permission_classes((permissions.AllowAny, ))
def login(request):
    '''
    To login
        1.  Get username, password, email
        2.  Generate_access_token  from id model User
        3.  Generate refresh_token from id model User
            set to cookie with httponly(hidden on front-end cookie)
        4.  Send access_token
    '''

    serializer = UserLoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    response = Response()
    access_token = generate_access_token(serializer.validated_data)
    refresh_token = generate_refresh_token(
        serializer.validated_data)
    response.set_cookie(key='refreshtoken', value=refresh_token, httponly=True)
    group_user = Group.objects.filter(user=serializer.validated_data).first()
    ''' Format:
        - Success:
            status code 200
            {
                "access_token":"sdmiaom.vcailemdflas.qweasd"
            }
        - Failed:
            status code != 200
            {
                "detail": "error when validating token."
            }
        '''
    if group_user is None:
        response.status_code = status.HTTP_200_OK
        response.data = {
            'access_token': access_token,
            'group_user': None
        }
        return response
    response.status_code = status.HTTP_200_OK
    response.data = {
        'access_token': access_token,
        'group_user': group_user.id if group_user.id is not None else "null",
    }
    return response


@api_view(['POST'])
@permission_classes([permissions.AllowAny, ])
@authentication_classes([])
# @csrf_protect
def refresh_token_view(request):
    '''
    To obtain a new access_token this view expects 2 important things:
        1. a cookie that contains a valid refresh_token
        2. a header 'X-CSRFTOKEN' with a valid csrf token, client app can get it from cookies "csrftoken"
    '''
    refresh_token = request.COOKIES.get('refreshtoken')
    if refresh_token is None:
        raise exceptions.AuthenticationFailed(
            'Authentication credentials were not provided.')
    try:
        payload = jwt.decode(
            refresh_token, settings.REFRESH_TOKEN_SECRET, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise exceptions.AuthenticationFailed(
            'expired refresh token, please login again.')

    user = User.objects.filter(id=payload.get('user_id')).first()
    group_user = Group.objects.filter(user=user).first()
    if user is None:
        raise exceptions.AuthenticationFailed('User not found')

    if not user.is_active:
        raise exceptions.AuthenticationFailed('user is inactive')

    access_token = generate_access_token(user)
    return Response({'access_token': access_token, 'group_user': group_user.id})


class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)
    # permission_classes = [(permissions.AllowAny)]

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login_doctor(request):
    return Response({'message': True})


@api_view(['POST'])
def login_staff(request):

    return Response({'message': True})
    pass
