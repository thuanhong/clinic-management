from django.contrib.auth import authenticate
from rest_framework import serializers, exceptions

from .models import Sick, PatientVisit, Appointment
from authentication.models import *
from patient.serializers import PatientSerializer
from patient.models import Patient
class SickSerializer(serializers.ModelSerializer):
    '''
    Create Diagnosise include data{

    }
    '''
    class Meta:
        model = Sick
        fields = ["name", "description"]
        depth = 1

class PatientVisitSerializer(serializers.ModelSerializer):
    '''
    Create Diagnosise include data{

    }
    '''
    # patient = PatientSerializer(many=False)
    doctor = serializers.CharField(required=False)
    patient = PatientSerializer( many=False)
    treatment = serializers.CharField(required=False)


    class Meta:
        model = PatientVisit
        fields = ["id","doctor", "patient",'treatment',"charges",]
        read_only_fields = ['id']
        depth = 1
    def create(self, validated_data):
        #validate doctor
        doctor = Profile.objects.filter(pk=validated_data.pop('doctor')).first()
        if not doctor:
            raise serializers.ValidationError(
                detail="Doctor not exist")
        # valitedate patient
        patient_param =validated_data.pop('patient')
        patient = Patient.objects.filter(identity_card=patient_param['identity_card']).first()
        if not patient:
            patient = Patient.objects.create(**patient_param)
        # valitedate treatment
        treatment = Sick.objects.filter(name=validated_data.pop('treatment').strip()).first()
        if not treatment:
            raise serializers.ValidationError(
                detail="Treatment not exist")

        patient_visit = PatientVisit.objects.create(**validated_data,doctor=doctor, 
                                                    patient=patient, treatment=treatment)
        return patient_visit

