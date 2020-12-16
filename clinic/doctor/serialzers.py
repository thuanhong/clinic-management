from django.contrib.auth import authenticate
from django.utils.timezone import localtime, now
from django.db.models import Q, Count
from rest_framework import serializers, exceptions

from .models import Sick, PatientVisit, Appointment,\
                    Diagnostician, PrescriptionItems,\
                        Payment
from authentication.models import *
from authentication.serializers import ProfileSerializer, UserSerializer
from authentication.services import AuthenticationService
from patient.serializers import PatientSerializer
from patient.models import Patient
from drug.models import StoreDrug
from datetime import timedelta

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
    doctor = serializers.CharField(required=False)
    patient = PatientSerializer(many=False)
    treatment = serializers.CharField(
        required=False, allow_null=True, allow_blank=True)

    class Meta:
        model = PatientVisit
        fields = ["id", "doctor", "patient", 'treatment',
                  "charges", 'created_at', 'updated_at']
        read_only_fields = ['id']
        depth = 1
        ordering = ['created_at']
        # lookup_field = 'patient_id'

    def create(self, validated_data):
        # validate doctor
        rule = Rule.objects.get(pk=1)
        limited_patient = rule.rule_parameters['limited']
        today = localtime(now()).replace(hour=0,minute=0, second=0,microsecond=0)

        nextday = localtime(today + timedelta(days=1)).replace(hour=0,
                                                            minute=0,
                                                            second=0,
                                                            microsecond=0)
        total_visitor = PatientVisit.objects.filter(created_at__lte=nextday,created_at__gte=today)
        total_count = 0
        for i in total_visitor:
            total_count +=1

        if(total_count >limited_patient):
            raise serializers.ValidationError(
                detail="The patient higher than per day")

        doctor = Profile.objects.filter(
            pk=validated_data.pop('doctor')).first()
        if not doctor:
            raise serializers.ValidationError(
                detail="Doctor not exist")
        # validate patient
        patient_param = validated_data.pop('patient')
        patient = Patient.objects.filter(
            identity_card=patient_param['identity_card']).first()
        if not patient:
            patient = Patient.objects.create(**patient_param)
        # validate treatment
        treatment = Sick.objects.filter(
            name=validated_data.pop('treatment')).first()

        patient_visit = PatientVisit.objects.create(**validated_data, doctor=doctor,
                                                    patient=patient, treatment=treatment)
        return patient_visit


class DoctorSerializer(ProfileSerializer):
    '''

    '''
    user = UserSerializer(many=False)
    typed = 'doctor'
    title = serializers.CharField(
        required=False, allow_blank=True, default=typed, initial=typed)

    def create(self, validated_data):
        email = validated_data['email']
        if AuthenticationService.is_email_exists(email):
            raise serializers.ValidationError(
                detail="Email is already exists. Please check again!")
        user = AuthenticationService.create_new_user(
            validated_data.pop('user'))
        profile = Profile(**validated_data)
        profile.user = user
        profile.save()
        return profile

    def validate_title(self, data):
        if data != self.typed:
            raise serializers.ValidationError(
                detail="User must have title {}".format(self.typed))
        return data


class NurseSerializer(ProfileSerializer):
    typed = 'nurse'
    user = UserSerializer(many=False)
    title = serializers.CharField(
        required=False, allow_blank=True, default=typed, initial=typed)

    def create(self, validated_data):
        email = validated_data['email']
        if AuthenticationService.is_email_exists(email):
            raise serializers.ValidationError(
                detail="Email is already exists. Please check again!")
        user = AuthenticationService.create_new_user(
            validated_data.pop('user'))
        profile = Profile(**validated_data)
        profile.user = user
        profile.save()
        return profile

    def validate_title(self, data):
        if data != self.typed:
            raise serializers.ValidationError(
                detail="User must have title {}".format(self.typed))
        return data

class AppointmentSerializer(serializers.ModelSerializer):
    '''
    Create Diagnosise include data{

    }
    '''
    patient_id = serializers.CharField(max_length=255)
    doctor_id = serializers.CharField(max_length=255)
    patient = PatientSerializer(read_only=True)
    doctor = DoctorSerializer(read_only=True)
    class Meta:
        model = Appointment
        fields = ["id", "patient_id",'patient', "doctor_id",'doctor', "appointment_date"]
        read_only = ['id']




class DiagnosticianSerializer(serializers.ModelSerializer):
    '''
    Create Diagnosise include data{

    }
    '''
    patient_id = serializers.CharField(max_length=255)
    treatment_id = serializers.CharField(max_length=255)
    patient = PatientSerializer(read_only=True)
    treatment = SickSerializer(read_only=True)
    class Meta:
        model = Diagnostician
        fields = ["id",'patient_id', "patient", "symptom",'treatment_id',"treatment",'created_at','updated_at']
        read_only = ['id']
        depth = 1

class PrescriptionItemsSerializer(serializers.ModelSerializer):
    '''
    Create Diagnosise include data{

    }
    '''
    payment_id = serializers.CharField(max_length=255)
    drug_id = serializers.CharField(max_length=255)
    diagnostician_id = serializers.CharField(max_length=255)
    diagnostician = DiagnosticianSerializer(read_only=True)
    class Meta:
        model = PrescriptionItems
        fields = ["id", "quanlity", "payment_id", "drug_id",'diagnostician', 'diagnostician_id']
        read_only = ['id']
        depth = 1


class PaymentSerializer(serializers.ModelSerializer):
    '''
    Create Diagnosise include data{

    }
    '''
    patient_id = serializers.CharField(max_length=255)
    doctor_id = serializers.CharField(max_length=255)
    patient = PatientSerializer(read_only=True)
    doctor = DoctorSerializer(read_only=True)
    class Meta:
        model = Payment
        fields = ["id",'patient_id', "patient", "doctor",'doctor_id',"amount",'created_at','updated_at','check_out']
        read_only = ['id']
        depth = 1