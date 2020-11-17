from django.db import models

# Create your models here.


class Item(models.Model):

    def __str__(self):
        return self.title


class StoreDrug(models.Model):
    title = models.CharField(max_length=100)
    unit = models.CharField(max_length=100)
    price = models.FloatField()
    quantity = models.IntegerField()
    description = models.TextField()


class Store_Item(models.Model):
    # item_id = models.ManyToManyField(Item, verbose_name='item',
    #                                  blank=True, related_name="catelory_id",)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    pass
