from django.urls import path
from django.views.generic import TemplateView

from .views import UserListCreateAPIView, UserRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('users', UserListCreateAPIView.as_view(), name='user-list-create'),
    path('users/<int:id>', UserRetrieveUpdateDestroyAPIView.as_view(), name='user-detail'),

    path('', TemplateView.as_view(template_name="index.html"), name='frontend'),
]
