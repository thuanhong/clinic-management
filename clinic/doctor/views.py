from django.conf import settings
from django.shortcuts import render
from django.views.decorators.csrf import csrf_protect
from rest_framework import viewsets, status, permissions, exceptions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes

from authentication.models import Profile
from .models import Sick, PatientVisit, Appointment, Diagnostician,\
                    Payment, PrescriptionItems
from .serialzers import SickSerializer, PatientVisitSerializer,\
     DoctorSerializer, NurseSerializer, AppointmentSerializer, \
         DiagnosticianSerializer, PaymentSerializer, PrescriptionItemsSerializer
from authentication.models import Profile
import uuid
import requests
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
    # def get_object(self):
    #     print(self.request.user.pk)
    #     obj = self.queryset.filter(patient_id=27)
        
    #     return obj



class DoctorViewSet(viewsets.ModelViewSet):
    permission_classes = [(permissions.AllowAny)]
    serializer_class = DoctorSerializer
    queryset = Profile.objects.filter(title="doctor")
    http_method_names = ['get', 'patch', 'post']


class NurseViewSet(viewsets.ModelViewSet):
    permission_classes = [(permissions.AllowAny)]
    serializer_class = NurseSerializer
    queryset = Profile.objects.filter(title="nurse")
    http_method_names = ['get', 'patch', 'post']


class AppointmentViewSet(viewsets.ModelViewSet):
    permission_classes = [(permissions.AllowAny)]
    serializer_class = AppointmentSerializer
    queryset = Appointment.objects.all()
    http_method_names = ['get', 'patch', 'post']

class DiagnosticianViewSet(viewsets.ModelViewSet):
    permission_classes = [(permissions.AllowAny)]
    serializer_class = DiagnosticianSerializer
    queryset = Diagnostician.objects.all()
    http_method_names = ['get', 'patch', 'post']

class PrescriptionItemsViewSet(viewsets.ModelViewSet):
    permission_classes = [(permissions.AllowAny)]
    serializer_class = PrescriptionItemsSerializer
    queryset = PrescriptionItems.objects.all()
    http_method_names = ['get', 'patch', 'post']

@api_view(['GET','POST'])
@authentication_classes([])
@permission_classes((permissions.AllowAny, ))
def upload_in_request(request):
    if request.method == "GET":
        return Response(data={'message':'GET'})
    if request.method == "POST":
        import uuid

        fileID = str(uuid.uuid1())
        print(fileID)
        body = request.data.get('imageStr')
        url = 'https://huqi75n1x1.execute-api.us-east-1.amazonaws.com/default/digital-lambda'
        headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}

        data = body.split(',',1)
        test=data[0].split(';',1)[0]
        test =test.split(':',1)[1]
        data=data[1]
        # print(body)
        re = requests.post(url,json={'name':fileID,'type':test,'data':data})
        print(re)
        print(re.text)


        return Response(data={'image':re.text})


class PaymentViewSet(viewsets.ModelViewSet):
    permission_classes = [(permissions.AllowAny)]
    serializer_class = PaymentSerializer
    queryset = Payment.objects.all()
    http_method_names = ['get', 'patch', 'post']