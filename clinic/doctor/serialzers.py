from django.contrib.auth import authenticate
from rest_framework import serializers, exceptions

from .models import Diagnosise

class DiagnosiseSerializer(serializers.ModelSerializer):
    '''
    Create Diagnosise include data{

    }
    '''
    class Meta:
        model = Diagnosise
        fields = ["patient", "sick", 'prescription',
                        "created_at", "updated_at",]

    def create(self, validated_data):
        return super().save(**validated_data)

    def update(self, instance, validated_data):
        return super().update(**validated_data)
