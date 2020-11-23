from django.conf import settings
from django.shortcuts import render
from django.views.decorators.csrf import csrf_protect
from rest_framework import viewsets, status, permissions, exceptions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes

from .models import Sick, PatientVisit, Appointment
from .serialzers import SickSerializer, PatientVisitSerializer, DoctorSerializer, NurseSerializer
from authentication.models import Profile
# Create your views here.


# TURN ON permission_classes = [(permissions.AllowAny)] FOR TESTING


class SickViewSet(viewsets.ModelViewSet):
    permission_classes = [(permissions.AllowAny)]
    serializer_class = SickSerializer
    queryset = Sick.objects.all()
    http_method_names = ['get', 'patch', 'post']


class PatientVisitViewSet(viewsets.ModelViewSet):
    permission_classes = [(permissions.AllowAny)]
    serializer_class = PatientVisitSerializer
    queryset = PatientVisit.objects.all().order_by('-created_at')
    http_method_names = ['get', 'patch', 'post']


class DoctorViewSet(viewsets.ModelViewSet):
    # permission_classes = [(permissions.AllowAny)]
    serializer_class = DoctorSerializer
    queryset = Profile.objects.filter(title="doctor")
    http_method_names = ['get', 'patch', 'post']


class NurseViewSet(viewsets.ModelViewSet):
    permission_classes = [(permissions.AllowAny)]
    serializer_class = NurseSerializer
    queryset = Profile.objects.filter(title="nurse")
    http_method_names = ['get', 'patch', 'post']
