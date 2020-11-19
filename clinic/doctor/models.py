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

    pass


class Appointment(models.Model):
    patientId = models.ForeignKey(Patient,on_delete=models.CASCADE,blank=True, null=True)
    doctorId = models.ForeignKey(Profile,on_delete=models.CASCADE,blank=True, null=True)
    appointment_date = models.DateTimeField(blank=True)


class PatientVisit(models.Model):
    birth_day = models.DateTimeField(blank=True)
    doctor = models.ForeignKey(Profile, on_delete=models.CASCADE)
    treatment = models.ForeignKey(Sick, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    charges = models.IntegerField(default=1)


class Payment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Profile, on_delete=models.CASCADE)
    amount = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username



class PrescriptionItems(models.Model):
    amount = models.IntegerField()
    paymentId = models.ForeignKey(Payment, on_delete=models.CASCADE)
    drugId = models.ForeignKey(StoreDrug, on_delete=models.CASCADE)