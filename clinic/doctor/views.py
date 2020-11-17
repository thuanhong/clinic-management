from django.conf import settings
from django.shortcuts import render
from django.views.decorators.csrf import csrf_protect
from rest_framework import viewsets, status, permissions, exceptions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes

from .models import Diagnosise, Sick
from .serialzers import DiagnosiseSerializer, SickSerializer
# Create your views here.


class DiagnosiseViewSet(viewsets.ModelViewSet):
    permission_classes = [(permissions.AllowAny)]
    serializer_class = DiagnosiseSerializer
    queryset = Diagnosise.objects.all()
    http_method_names = ['get', 'patch', 'post']


class SickViewSet(viewsets.ModelViewSet):
    permission_classes = [(permissions.AllowAny)]
    serializer_class = SickSerializer
    queryset = Sick.objects.all()
    http_method_names = ['get', 'patch', 'post']
