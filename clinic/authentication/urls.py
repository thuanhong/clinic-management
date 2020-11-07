from django.urls import path
from django.conf.urls import url
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, login, refresh_token_view

# Create a router and register our viewsets with it.
auth_router = DefaultRouter()
auth_router.register(r'users', UserViewSet)
urlpatterns = [
    path('login/', login),
    path('token/', refresh_token_view)
]
