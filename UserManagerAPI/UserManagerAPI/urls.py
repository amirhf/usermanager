"""
URL configuration for UserManagerAPI project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
"""
# from django.contrib import admin
from django.urls import path, include

from users.views import UserListCreateAPIView

urlpatterns = [
    #    path('admin/', admin.site.urls),
    path('users', UserListCreateAPIView.as_view(), name='user-list-create'),
    path('', include('users.urls')),  # include our users app URLs

]
