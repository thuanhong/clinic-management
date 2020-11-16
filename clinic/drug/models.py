from django.db import models

# Create your models here.
class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    def __str__(self):
        return self.name

class Store_Item(models.Model):
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE)
    unit = models.CharField(max_length=100)
    price = models.FloatField()
    quantity = models.IntegerField()
    image = models.CharField(max_length=255)


class Catelory(models.Model):
    item_id = models.ManyToManyField(Item,verbose_name='item',
        blank=True,related_name="catelory_id",)
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name
    pass
