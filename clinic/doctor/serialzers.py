from django.contrib.auth import authenticate
from rest_framework import serializers, exceptions

from .models import Sick

class SickSerializer(serializers.ModelSerializer):
    '''
    Create Diagnosise include data{

    }
    '''
    class Meta:
        model = Sick
        fields = ["name", "description"]
        depth = 1
