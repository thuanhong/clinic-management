from django.contrib.auth import authenticate
from rest_framework import serializers, exceptions

from .models import Patient, Prescription, PrescriptionDetail


class PatientSerializer(serializers.ModelSerializer):
    '''
    Create Patient include data{

    }
    '''
    class Meta:
        model = Patient
        fields = ['id', "first_name", "last_name",
                  'gender', 'address', 'birth_day']


class PrescriptionSerializer(serializers.ModelSerializer):
    '''
    Create Patient include data{

    }
    '''
    get_total = serializers.IntegerField(initial=2)

    class Meta:
        model = Prescription
        fields = ['id', "user", "items", 'get_total']


class PrescriptionDetailSerializer(serializers.ModelSerializer):
    '''
    Create Patient include data{

    }
    '''
    class Meta:
        model = PrescriptionDetail
        fields = ['item', "quantity"]
