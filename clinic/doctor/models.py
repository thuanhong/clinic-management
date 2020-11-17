from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.conf import settings
from authentication.models import User
from patient.models import Patient, Prescription

class Sick(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField()
    # catelory_sick =
    def __str__(self):
        return self.name

    pass

# class KindOfSick(models.Model):
#     name = models.CharField(max_length=255)
#     def __str__(self):
#         return self.name

class Diagnosise(models.Model):
    '''
    Class implementing Medical history of patient
    '''
    # patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    # sick = models.ManyToManyField(Sick,related_name='diagnosise_sick')
    # prescription = models.ForeignKey(Prescription,on_delete=models.CASCADE,blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Doctor(models.Model):
    '''
    Class implementing Doctor models
    '''
    doctorId = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    birth_day = models.DateTimeField(blank=True)
    gender = models.CharField(max_length=255, blank=True)
    address = models.CharField(max_length=255, blank=True)


class Nurse(models.Model):
    '''
    Class implementing Nurse models
    '''
    nurseId = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    birth_day = models.DateTimeField(blank=True)
    gender = models.CharField(max_length=255, blank=True)
    address = models.CharField(max_length=255, blank=True)


class Appointment(models.Model):
    patientId = models.ForeignKey(Patient,on_delete=models.CASCADE,blank=True, null=True)
    doctorId = models.ForeignKey(Doctor,on_delete=models.CASCADE,blank=True, null=True)
    nurseId = models.ForeignKey(Nurse,on_delete=models.CASCADE,blank=True, null=True)
    appointment_date = models.DateTimeField(blank=True)


class PatientVisit(models.Model):
    birth_day = models.DateTimeField(blank=True)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    treatment = models.ForeignKey(Sick, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    charges = models.IntegerField(default=1)


class Payment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    prescription = models.OneToOneField(Prescription, on_delete=models.CASCADE)
    amount = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username