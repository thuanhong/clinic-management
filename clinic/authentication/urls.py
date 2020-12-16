from django.urls import path
from django.conf.urls import url
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, GroupViewSet, PermissionViewSet, login, refresh_token_view, login_doctor,\
    login_staff, ProfileViewSet, ChangePasswordView

# Create a router and register our viewsets with it.
auth_router = DefaultRouter()
auth_router.register(r'users', UserViewSet)
auth_router.register(r'groups', GroupViewSet)
auth_router.register(r'permissions', PermissionViewSet)
auth_router.register(r'profile', ProfileViewSet)
urlpatterns = [
    path('login/', login),
    path('token/', refresh_token_view),
    path('login-doctor/', login_doctor),
    path('login-staff/', login_staff),
    path('change-password/', ChangePasswordView.as_view(), name='change-password')
]
