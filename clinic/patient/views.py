from django.conf import settings
from django.shortcuts import render
from django.views.decorators.csrf import csrf_protect
from rest_framework import viewsets, status, permissions, exceptions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes

from .serializers import PatientSerializer
from .models import Patient
from doctor.models import PatientVisit, Payment
from authentication.models import Group
from django.db.models import Q, Sum, Count

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

        if pk == None:
            if group_user == 2:
                patient = Patient.objects.filter(
                    patientvisit__doctor__user__username=user).values().distinct()
                return Response(data=patient)
            else:
                patient = Patient.objects.all().values()
                return Response(data=patient)


@api_view(['GET'])
@authentication_classes([])
@permission_classes((permissions.AllowAny, ))
def static_patient(request):
    from django.db import connection


    truncate_month = connection.ops.date_trunc_sql('month', 'day')
    patient = PatientVisit.objects.extra({'month': truncate_month}).values(
        'created_at__month').annotate(Count('patient_id')).distinct()

    return Response(data=patient)

@api_view(['GET'])
@authentication_classes([])
@permission_classes((permissions.AllowAny, ))
def static_payment(request):
    from django.db import connection


    truncate_month = connection.ops.date_trunc_sql('month', 'day')
    patient = Payment.objects.extra({'month': truncate_month}).values(
        'created_at__month').annotate(Sum('amount')).distinct()

    return Response(data=patient)