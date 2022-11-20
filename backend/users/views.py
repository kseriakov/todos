import logging

from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, DestroyAPIView
from rest_framework import status, permissions
from django.core.exceptions import ObjectDoesNotExist

from .permissions import IsOnlyChief, IsOnlyMyWorker
from .paginations import UserPagination
from .models import UserTodos
from .serializers import UserCreateSerializer, UserSerializer


logger = logging.getLogger(__name__)


class ChiefWorkersListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        chief = request.user
        qs = UserTodos.objects.filter(chief=chief).order_by('last_name')
        serializer = UserSerializer(qs, many=True)
        data = {"workers": serializer.data}
        return Response(data, status=status.HTTP_200_OK)


class AllActiveUsersAPIView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer
    pagination_class = UserPagination

    def get_queryset(self):
        return UserTodos.objects.filter(is_active=True)


class CreateWorkerAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsOnlyChief]

    def post(self, request):
        serializer = UserCreateSerializer(
            data=request.data, context={'chief_id': request.user.id}
        )

        if serializer.is_valid():
            serializer.save()

            logger.info(
                f'Chief {request.user} created new worker: '
                f'{serializer.data["first_name"]} {serializer.data["last_name"]}'
            )

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(
                {'error': serializer.errors},
                status=status.HTTP_400_BAD_REQUEST,
            )


class DeleteWorkerAPIView(DestroyAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
        IsOnlyChief,
        IsOnlyMyWorker,
    ]
    queryset = UserTodos.objects.all()

    def delete(self, request, pk):
        try:
            UserTodos.objects.get(pk=pk)
        except ObjectDoesNotExist:
            return Response(
                {'error': f'Worker with id = {pk} does not exists'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        worker = self.get_object()
        worker.delete()

        logger.info(
            f'Chief {request.user} deleted worker: '
            f'{worker.first_name} {worker.last_name}'
        )

        return Response(status=status.HTTP_204_NO_CONTENT)
