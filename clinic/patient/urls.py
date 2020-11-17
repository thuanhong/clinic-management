from django.urls import path
from django.conf.urls import url
from rest_framework.routers import DefaultRouter
from .views import PatientViewSet, PrescriptionViewSet, PrescriptionDetailViewSet

# Create a router and register our viewsets with it.
patient_router = DefaultRouter()
patient_router.register(r'patient', PatientViewSet)
patient_router.register(r'prescription', PrescriptionViewSet)
patient_router.register(r'prescription-detail', PrescriptionDetailViewSet)


urlpatterns = [
]
