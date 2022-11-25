from django.urls import path

from .views import (
    ChiefTasksAPIView,
    TaskCreateAPIView,
    TaskChangeChiefAPIView,
    WorkerTasksAPIView,
)


urlpatterns = [
    path('chief/', ChiefTasksAPIView.as_view(), name='chief_tasks'),
    path('chief/create/', TaskCreateAPIView.as_view(), name='task_create'),
    path('chief/<int:pk>/', TaskChangeChiefAPIView.as_view(), name='chief_task_change'),
    path('worker/<int:pk>/', WorkerTasksAPIView.as_view(), name='worker_tasks'),
]
