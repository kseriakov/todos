from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from users.serializers import UserSerializer

from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    chief = UserSerializer(read_only=True)
    worker = UserSerializer(read_only=True)
    text = serializers.CharField(required=False)
    date = serializers.DateField(required=False)

    # Если не установить по умолчанию, при patch запросе авт. устанавливается в False
    is_active = serializers.BooleanField(required=False)
    is_completed = serializers.BooleanField(required=False)
    is_closed = serializers.BooleanField(required=False)

    class Meta:
        model = Task
        fields = (
            'id',
            'worker',
            'chief',
            'text',
            'date',
            'is_active',
            'is_completed',
            'is_closed',
        )


class TaskCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = (
            'worker_id',
            'text',
            'date',
        )

    def create(self, validated_data):
        validated_data.update(self.context)

        if not (
            validated_data.get('chief_id') and validated_data.get('worker_id')
        ):
            raise ValidationError('Serializer not get chief_id')

        return Task.objects.create(**validated_data)
