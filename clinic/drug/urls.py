from django.urls import path
from django.conf.urls import url
from rest_framework.routers import DefaultRouter
from .views import Store_ItemViewSet

# Create a router and register our viewsets with it.
drug_router = DefaultRouter()
drug_router.register(r'store-item', Store_ItemViewSet)

urlpatterns = [
]
