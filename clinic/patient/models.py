from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.conf import settings
from authentication.models import User
from drug.models import StoreDrug


class Patient(models.Model):
    '''
    Class implementing Profile User
    '''
    first_name = models.CharField(max_length=255,blank=True)
    last_name = models.CharField(max_length=255,blank=True)
    age = models.IntegerField( blank= True)
    gender = models.CharField(max_length=255,blank=True)
    bio = models.TextField(max_length=500, blank=True)
    address = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)

    class Meta:
        pass

    def get_full_name(self):
        return '{} {}'.format(self.first_name, self.last_name)

    def __str__(self):
        return 'Name: {} {}'.format(self.first_name, self.last_name)



class Prescription(models.Model):
    '''
    Class implementing Prescription of patient
    take all item(drug)
    '''
    items = models.ManyToManyField(
        StoreDrug, related_name='prescription_id')

    def __str__(self):
        return self.user.get_full_name()

    # fix query to Item models
    def get_total(self):
        total = 0
        for order_item in self.items.all():
            total += order_item.get_final_price()
        return total

