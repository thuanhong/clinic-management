from django.conf import settings
from django.shortcuts import render
from django.views.decorators.csrf import csrf_protect
from rest_framework import viewsets, status, permissions, exceptions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes

from .serializers import PatientSerializer
from .models import Patient
from authentication.models import Group

# Create your views here.
class PatientViewSet(viewsets.ModelViewSet):
    # permission allow on develop
    permission_classes = [(permissions.AllowAny)]
    serializer_class = PatientSerializer
    queryset = Patient.objects.all()
    http_method_names = ['get', 'patch', 'post']
    # ordering = ['id']
    def list(self, request, pk=None):
        user = request.user
        group_user = Group.objects.filter(user=user).first()

        if pk ==None:
            if group_user ==2:
                patient = Patient.objects.filter(patientvisit__doctor__user__username=user).values().distinct()
                return Response(data=patient)
            else:
                patient = Patient.objects.all().values()
                return Response(data=patient)