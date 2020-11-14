from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.conf import settings
from authentication.models import User
from drug.models import Item

class Patient(models.Model):
    '''
    Class implementing Profile User
    '''
    first_name = models.CharField(max_length=255,blank=True)
    last_name = models.CharField(max_length=255,blank=True)
    birth_day = models.DateTimeField()
    gender = models.CharField(max_length=255,blank=True)
    address = models.CharField(max_length=255,blank=True)


    class Meta:
        pass

    def __str__(self):
        return 'Name: {} {}'.format(self.first_name, self.last_name)


class PrescriptionDetail(models.Model):
    '''
    Class implementing PrescriptionDetail of patient
    '''

    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} of {self.item.title}"

    def get_final_price(self):
        return self.quantity * self.item.price


class Prescription(models.Model):
    '''
    Class implementing Prescription of patient
    take all item(drug)
    '''
    user = models.ForeignKey(Patient,
                             on_delete=models.CASCADE)
    items = models.ManyToManyField(PrescriptionDetail,related_name='prescription_id')
    ordered = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username

    def get_total(self):
        total = 0
        for order_item in self.items.all():
            total += order_item.get_final_price()
        return total


class Payment(models.Model):
    user = models.ForeignKey(Patient,
                             on_delete=models.SET_NULL, blank=True, null=True)
    amount = models.FloatField(default=300)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username