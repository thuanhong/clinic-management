from django.urls import path
from django.conf.urls import url
from rest_framework.routers import DefaultRouter
from .views import SickViewSet, PatientVisitViewSet, DoctorViewSet

# Create a router and register our viewsets with it.
doctor_router = DefaultRouter()
doctor_router.register(r'sick', SickViewSet)
doctor_router.register(r'patient-visit', PatientVisitViewSet)
doctor_router.register(r'doctor',DoctorViewSet)
urlpatterns = [
]
