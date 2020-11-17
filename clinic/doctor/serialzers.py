from django.contrib.auth import authenticate
from rest_framework import serializers, exceptions

from .models import Diagnosise, Sick


class DiagnosiseSerializer(serializers.ModelSerializer):
    '''
    Create Diagnosise include data{

    }
    '''
    class Meta:
        model = Diagnosise
        fields = ['id', "patient", "sick", 'prescription',
                  "created_at", "updated_at", ]


class SickSerializer(serializers.ModelSerializer):
    '''
    Create Diagnosise include data{

    }
    '''
    class Meta:
        model = Sick
        fields = ["name", "description"]
        depth = 1
