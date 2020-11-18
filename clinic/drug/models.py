from django.db import models

# Create your models here.


class UnitDrug(models.Model):
    name = models.CharField(max_length=50)


class GuideDrug(models.Model):
    description = models.TextField()


class StoreDrug(models.Model):
    title = models.CharField(max_length=100)
    unit = models.CharField(max_length=100)
    price = models.FloatField()
    quantity = models.IntegerField()
    description = models.TextField()
    unit = models.ForeignKey(UnitDrug,on_delete=models.CASCADE, blank=True, null=True)
    guide = models.ForeignKey(GuideDrug,on_delete=models.CASCADE,blank=True, null=True)
