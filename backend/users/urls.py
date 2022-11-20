from django.urls import path

from .views import (
    AllActiveUsersAPIView,
    ChiefWorkersListView,
    CreateWorkerAPIView,
    DeleteWorkerAPIView,
)


urlpatterns = [
    path('chief-workers/', ChiefWorkersListView.as_view(), name='chief_workers'),
    path('all/', AllActiveUsersAPIView.as_view(), name='all_users'),
    path('create/worker/', CreateWorkerAPIView.as_view(), name='create_worker'),
    path('delete/worker/<int:pk>/', DeleteWorkerAPIView.as_view(), name='delete_worker'),
]
