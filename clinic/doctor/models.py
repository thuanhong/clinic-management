from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.conf import settings
from authentication.models import User
from patient.models import Patient, Prescription

class Diagnosise(models.Model):
    '''
    Class implementing Medical history of patient
    '''
    patient_id = models.ForeignKey(Patient, on_delete=models.CASCADE)
    x_ray = models.CharField(max_length=255,blank=True)
    allergy = models.CharField(max_length=255,blank=True)
    pregnant = models.CharField(max_length=255,blank=True)
    prescription_id = models.ForeignKey(Prescription,on_delete=models.CASCADE,blank=True, null=True)
    pass
