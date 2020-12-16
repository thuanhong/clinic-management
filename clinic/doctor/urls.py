from django.urls import path
from django.conf.urls import url
from rest_framework.routers import DefaultRouter
from .views import ( SickViewSet, PatientVisitViewSet,
                     DoctorViewSet,DiagnosticianViewSet,
                     NurseViewSet,upload_in_request, 
                     AppointmentViewSet,PaymentViewSet,PrescriptionItemsViewSet)
# Create a router and register our viewsets with it.
doctor_router = DefaultRouter()
doctor_router.register(r'sick', SickViewSet)
doctor_router.register(r'patient-visit', PatientVisitViewSet)
doctor_router.register(r'doctor', DoctorViewSet)
doctor_router.register(r'nurse', NurseViewSet)
doctor_router.register(r'appointment', AppointmentViewSet)
doctor_router.register(r'diagnostician',DiagnosticianViewSet)
doctor_router.register(r'payment',PaymentViewSet)
doctor_router.register(r'prescription',PrescriptionItemsViewSet)
urlpatterns = [
       path('upload-image/', upload_in_request),
]
