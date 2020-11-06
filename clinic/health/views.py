from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions



@api_view(['GET'])
@permission_classes((permissions.AllowAny, ))
def simple_healthcheck(request):
    return Response({"message": "Clinic server is alive!"})


@api_view(['GET'])
def simple_auth_request(request):
    return Response({
        "message": "Request is authenticated!"
    })
