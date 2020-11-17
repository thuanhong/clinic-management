from django.conf import settings
from django.shortcuts import render
from django.views.decorators.csrf import csrf_protect
from rest_framework import viewsets, status, permissions, exceptions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes

from .serializers import ItemSerializers, Store_ItemSerializers
from .models import Item, Store_Item


# Create your views here.
class ItemViewSet(viewsets.ModelViewSet):
    # permission allow on develop
    permission_classes = [(permissions.AllowAny)]
    serializer_class = ItemSerializers
    queryset = Item.objects.all()
    http_method_names = ['get', 'patch', 'post']


class Store_ItemViewSet(viewsets.ModelViewSet):
    # permission allow on develop
    permission_classes = [(permissions.AllowAny)]
    serializer_class = Store_ItemSerializers
    queryset = Store_Item.objects.all()
    http_method_names = ['get', 'patch', 'post']
