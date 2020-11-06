from health.views import simple_healthcheck, simple_auth_request
from django.conf.urls import url
from django.urls import path
from rest_framework.routers import DefaultRouter

urlpatterns = [
    path('', simple_healthcheck),
    path('test-auth-request', simple_auth_request)
]
