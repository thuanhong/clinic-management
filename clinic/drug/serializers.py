from django.contrib.auth import authenticate
from rest_framework import serializers, exceptions

from .models import StoreDrug


class Store_ItemSerializers(serializers.ModelSerializer):
    '''
    Create Patient include data{

    }
    '''
    class Meta:
        model = StoreDrug
        fields = ['item_id', "unit", 'price', 'quantity', 'image']
