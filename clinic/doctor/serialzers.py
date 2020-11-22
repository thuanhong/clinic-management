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


class DoctorVisitSerializer(serializers.ModelSerializer):
    '''

    '''
    last_name = serializers.CharField(required=False, allow_null = True)
    age = serializers.CharField(required=False, allow_null = True)
    gender = serializers.CharField(required=False, allow_null = True)
    image = serializers.CharField(required=False, allow_null = True)
    bio = serializers.CharField(required=False, allow_null = True)
    location = serializers.CharField(required=False, allow_null = True)
    title = serializers.CharField(required=False, allow_null = True, default="doctor")

    class Meta:
        model = Profile
        fields = ["user","first_name", "last_name",'age',"gender",'image','bio','location','birth_date','title']
        read_only_fields = ['id']
        depth = 1
    def validate_title(self, data):
        if data != 'doctor':
            raise serializers.ValidationError(detail="User must have tilte doctor")
        return data