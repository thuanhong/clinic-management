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

class KindOfSick(models.Model):
    name = models.CharField(max_length=255)
    def __str__(self):
        return self.name
class Diagnosise(models.Model):
    '''
    Class implementing Medical history of patient
    '''
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    sick = models.ManyToManyField(Sick,related_name='diagnosise_sick')
    prescription = models.ForeignKey(Prescription,on_delete=models.CASCADE,blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)



