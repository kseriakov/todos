from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.response import Response

from .serializers import TaskSerializer
from .models import Task


class UpdateObjectMixin:
    def get_object(self, request, pk):
        try:
            task = Task.objects.get(pk=pk)
        except ObjectDoesNotExist:
            return Response(
                {'error': f'Task with id = {pk} does not exists'},
                status=status.HTTP_404_NOT_FOUND,
            )

        self.check_object_permissions(request, task)

        return task

    def patch(self, request, pk):
        task: Task | Response = self.get_object(request, pk)
        if not isinstance(task, Task):
            return task

        serializer = TaskSerializer(instance=task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': serializer.errors},
                status=status.HTTP_400_BAD_REQUEST,
            )
