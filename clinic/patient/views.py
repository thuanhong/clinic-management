from django.conf import settings
from django.shortcuts import render
from django.views.decorators.csrf import csrf_protect
from rest_framework import viewsets, status, permissions, exceptions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes

from .serializers import PatientSerializer, PrescriptionSerializer, PrescriptionDetailSerializer
from .models import Patient, Prescription, PrescriptionDetail


# Create your views here.
class PatientViewSet(viewsets.ModelViewSet):
    # permission allow on develop
    permission_classes = [(permissions.AllowAny)]
    serializer_class = PatientSerializer
    queryset = Patient.objects.all()
    http_method_names = ['get', 'patch', 'post']


class PrescriptionViewSet(viewsets.ModelViewSet):
    # permission allow on develop
    permission_classes = [(permissions.AllowAny)]
    serializer_class = PrescriptionSerializer
    queryset = Prescription.objects.all()
    http_method_names = ['get', 'patch', 'post']


class PrescriptionDetailViewSet(viewsets.ModelViewSet):
    # permission allow on develop
    permission_classes = [(permissions.AllowAny)]
    serializer_class = PrescriptionDetailSerializer
    queryset = PrescriptionDetail.objects.all()
    http_method_names = ['get', 'patch', 'post']
