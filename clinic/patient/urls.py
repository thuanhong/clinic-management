from django.urls import path
from django.conf.urls import url
from rest_framework.routers import DefaultRouter
from .views import PatientViewSet, static_patient, static_payment

# Create a router and register our viewsets with it.
patient_router = DefaultRouter()
patient_router.register(r'patient', PatientViewSet)


urlpatterns = [
    path('static-patient', static_patient),
    path('static-payment',static_payment)

]
