from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from .serializers import UserSerializer, UserLoginSerializer
from .models import User
from .utils import generate_access_token, generate_refresh_token


class UserViewSet(viewsets.ModelViewSet):
    # permission allow on develop
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer
    queryset = User.objects.all()
    http_method_names = ['get', 'patch', 'post']

@api_view(['POST'])
@permission_classes((permissions.AllowAny, ))
def login(request):
    serializer = UserLoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    response = Response()
    access_token  = generate_access_token(serializer.validated_data)
    refresh_token = generate_refresh_token(serializer.validated_data,access_token)
    response.set_cookie(key='refreshtoken', value= refresh_token, httponly=True)
    response.status_code= status.HTTP_200_OK
    response.data = {
        'access_token': access_token
    }
    return response
