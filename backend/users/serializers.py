from rest_framework import serializers
from django.contrib.auth import get_user_model


User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    tasks = serializers.PrimaryKeyRelatedField(
        many=True,
        read_only=True,
        source='worker_tasks',
    )
    chief_id = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'first_name',
            'last_name',
            'birthdate',
            'position',
            'chief_id',
            'is_chief',
            'is_active',
            'tasks',
        )

    def get_chief_id(self, user):
        if user.chief:
            return user.chief.pk


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'email',
            'first_name',
            'last_name',
            'birthdate',
            'position',
            'chief_id',
        )

    def create(self, validated_data):
        validated_data.update(self.context)
        return User.objects.create(**validated_data)
