from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.pagination import LimitOffsetPagination
from django.db.models import Q

from users.permissions import IsOnlyChief

from .serializers import TaskSerializer, TaskCreateSerializer
from .models import Task
from .paginations import TaskPagination
from .permissions import IsChiefForTask, IsWorkerForTask
from .mixins import UpdateObjectMixin


class ChiefTasksAPIView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated, IsChiefForTask]
    serializer_class = TaskSerializer
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        user = self.request.user
        qs = Task.objects.filter(Q(chief=user), Q(is_active=True)).order_by(
            'date'
        )
        return qs


class WorkerTasksAPIView(APIView, UpdateObjectMixin):
    permission_classes = [permissions.IsAuthenticated, IsWorkerForTask]
    pagination_class = LimitOffsetPagination

    @property
    def paginator(self):
        if not hasattr(self, '_paginator'):
            if self.pagination_class is None:
                self._paginator = None
            else:
                self._paginator = self.pagination_class()
        return self._paginator

    def paginate_queryset(self, queryset):
        if self.paginator is None:
            return None
        return self.paginator.paginate_queryset(
            queryset, self.request, view=self
        )

    def check_task_permissions(self, request, pk):
        if (
            request.user.pk != pk
            and not request.user.workers.filter(id=pk).exists()
        ):
            self.permission_denied(
                request,
                message="You do not have persmissons for this data",
                code=403,
            )

    def get_paginated_response(self, data):
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data)

    def get(self, request, pk):
        if not pk:
            return Response(
                {"You do not send worker id"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        self.check_task_permissions(request, pk)

        qs = Task.objects.filter(Q(worker_id=pk), Q(is_active=True)).order_by(
            'date'
        )
        page = self.paginate_queryset(qs)
        if page is not None:
            serializer = TaskSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = TaskSerializer(qs, many=True)

        return Response(serializer.data)


class TaskCreateAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsOnlyChief]

    def post(self, request):
        worker_id = request.data.get('worker_id')
        if not worker_id:
            return Response(
                {'error': 'You do not set worker_id'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if isinstance(worker_id, list):
            worker_id = worker_id[0]

        chief_id = request.user.pk

        serializer = TaskCreateSerializer(
            data=request.data,
            context={
                'chief_id': chief_id,
                'worker_id': worker_id,
            },
        )

        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(
                {'error': serializer.errors},
                status=status.HTTP_400_BAD_REQUEST,
            )


class TaskChangeChiefAPIView(APIView, UpdateObjectMixin):
    permission_classes = [permissions.IsAuthenticated, IsChiefForTask]

    def delete(self, request, pk):
        task: Task | Response = self.get_object(request, pk)

        if not isinstance(task, Task):
            return task

        task.delete()

        return Response(
            {'success': f'Task for {task.worker} deleted successful'},
            status=status.HTTP_204_NO_CONTENT,
        )


# class TaskChangeWorkerAPIView(APIView, UpdateObjectMixin):
#     permission_classes = [
#         permissions.IsAuthenticated,
#         IsWorkerForTask,
#     ]
