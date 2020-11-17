from django.contrib.auth import authenticate
from rest_framework import serializers, exceptions

from .models import Item, Store_Item


class ItemSerializers(serializers.ModelSerializer):
    '''
    Create Patient include data{

    }
    '''
    class Meta:
        model = Item
        fields = ['title', "description"]


class Store_ItemSerializers(serializers.ModelSerializer):
    '''
    Create Patient include data{

    }
    '''
    class Meta:
        model = Store_Item
        fields = ['item_id', "unit", 'price', 'quantity', 'image']
