from django.contrib.auth import authenticate
from rest_framework import serializers, exceptions

from .models import Patient


class PatientSerializer(serializers.ModelSerializer):
    '''
    Create Patient include data{

    }
    '''
    class Meta:
        model = Patient
        fields = ['id', "first_name", "last_name",
                  'gender', 'address', 'birth_date','identity_card','insurance']
        read_only_fields = ['id']
