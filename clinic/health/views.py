from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework import permissions
from authentication.models import Group

@api_view(['GET'])
@authentication_classes([])
@permission_classes((permissions.AllowAny, ))
def simple_healthcheck(request):
    return Response({"message": "Clinic server is alive!"})


@api_view(['GET'])
def simple_auth_request(request):
    user = request.user
    group_user = Group.objects.filter(user=user).first()

    print(user)

    return Response({
        "message": "Request is authenticated!",
        "group_user":group_user.id
    })
