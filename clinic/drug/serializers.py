from django.contrib.auth import authenticate
from rest_framework import serializers, exceptions

from .models import StoreDrug, UnitDrug, GuideDrug


class Store_ItemSerializers(serializers.ModelSerializer):
    '''
    Create Store Item include data{
        item_id = id 
        unit
        price
        quantity
        image
    }
    '''
    class Meta:
        model = StoreDrug
        fields = ['id','title', "unit", 'price', 'quantity', 'description']


class Unit_DrugSerializer(serializers.ModelSerializer):

    class Meta:
        model = UnitDrug
        fields = ['id','name']
    pass