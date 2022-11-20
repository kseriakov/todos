from rest_framework.permissions import BasePermission
from rest_framework.exceptions import PermissionDenied


class IsOnlyChief(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_chief
    

class IsOnlyMyWorker(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.chief.pk == request.user.pk
