from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.conf import settings
from authentication.models import User, Profile
from patient.models import Patient
from drug.models import StoreDrug


class Sick(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField()

    def __str__(self):
        return self.name

    class Meta:
        pass
    pass


class Appointment(models.Model):
    patient = models.ForeignKey(
        Patient, on_delete=models.CASCADE, blank=True, null=True, related_name='patient_appointment', related_query_name='appointment')
    doctor = models.ForeignKey(
        Profile, on_delete=models.CASCADE, blank=True, null=True, related_query_name='appointment')
    appointment_date = models.DateTimeField(blank=True)


class PatientVisit(models.Model):
    doctor = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_query_name='patientvisit')
    treatment = models.ForeignKey(
        Sick, on_delete=models.CASCADE, related_query_name='patientvisit', null=True)
    patient = models.ForeignKey(Patient, related_name='cmnd',
                                related_query_name='patientvisit', on_delete=models.CASCADE)
    charges = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Payment(models.Model):
    patient = models.ForeignKey(
        Patient, on_delete=models.CASCADE, related_query_name='payment')
    doctor = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_query_name='payment')
    amount = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    check_out = models.BooleanField(default=False)

    def __str__(self):
        return self.patient


class Diagnostician(models.Model):
    patient = models.ForeignKey(
        Patient, on_delete=models.CASCADE, blank=True, null=True, related_name='patient_diagnostician', related_query_name='diagnostician')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    symptom = models.TextField(null=True, blank=True)
    treatment = models.ForeignKey(
        Sick, on_delete=models.CASCADE, related_query_name='diagnostician', null=True)




class PrescriptionItems(models.Model):
    quanlity = models.IntegerField()
    payment = models.ForeignKey(
        Payment, on_delete=models.CASCADE, related_query_name='prescription_items')
    drug = models.ForeignKey(
        StoreDrug, on_delete=models.CASCADE, related_query_name='prescription_items')
    diagnostician = models.ForeignKey(
        Diagnostician, on_delete=models.CASCADE,related_name='diagnostician_prescription_items' ,related_query_name='prescription_items')
