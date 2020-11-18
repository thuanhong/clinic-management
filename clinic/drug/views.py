from django.conf import settings
from django.shortcuts import render
from django.views.decorators.csrf import csrf_protect
from rest_framework import viewsets, status, permissions, exceptions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes

from .serializers import Store_ItemSerializers
from .models import  StoreDrug


class Store_ItemViewSet(viewsets.ModelViewSet):
    # permission allow on develop
    permission_classes = [(permissions.AllowAny)]
    serializer_class = Store_ItemSerializers
    queryset = StoreDrug.objects.all()
    http_method_names = ['get', 'patch', 'post']
