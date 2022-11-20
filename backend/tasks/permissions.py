from rest_framework.permissions import BasePermission


class IsChiefForTask(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.chief.pk == request.user.pk


class IsWorkerForTask(BasePermission):
    def has_object_permission(self, request, view, obj):
        is_allowed_properties = len(request.data.keys()) == 1 and (
            'is_completed' in request.data
        )
        return obj.worker.pk == request.user.pk and is_allowed_properties
