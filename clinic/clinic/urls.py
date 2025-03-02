"""clinic URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from authentication.urls import auth_router
from doctor.urls import doctor_router
from patient.urls import patient_router
from drug.urls import drug_router
router = DefaultRouter(trailing_slash=False)
router.registry.extend(auth_router.registry)
router.registry.extend(doctor_router.registry)
router.registry.extend(patient_router.registry)
router.registry.extend(drug_router.registry)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('health/', include("health.urls")),
    path('auth/', include("authentication.urls")),
    path('api/v1/', include(router.urls)),
    path('api/', include('doctor.urls')),
    path('api/',include('patient.urls'))
]
