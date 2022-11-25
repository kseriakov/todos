import logging
from rest_framework import serializers
from django.contrib.auth import get_user_model

from todos.settings import DEFAULT_FROM_EMAIL, SITE_NAME

from .tasks import send_no_blocking_mail


User = get_user_model()

logger = logging.getLogger(__name__)


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


class WorkerCreateSerializer(serializers.ModelSerializer):
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


class ChiefCreateSerilaizer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'email',
            'first_name',
            'last_name',
            'birthdate',
            'position',
            'password',
        )

    def create(self, validated_data):
        validated_data.update({'is_active': False, 'is_chief': True})

        first_name = validated_data.get('first_name')
        last_name = validated_data.get('last_name')
        email = validated_data.get('email')

        send_no_blocking_mail(
            subject='Регистрация руководителя',
            message=f'Подтвердите регистрацию для пользователя {first_name} {last_name}',
            from_email=DEFAULT_FROM_EMAIL,
            recipient_list=[DEFAULT_FROM_EMAIL],
            fail_silently=True,
        )

        send_no_blocking_mail(
            subject=f'Регистрация на сайте {SITE_NAME}',
            message=f'Ваш запрос на регистрацию успешно отправлен адмминистрации '
            f'сайта {SITE_NAME}, ожидайте подтверждения',
            from_email=DEFAULT_FROM_EMAIL,
            recipient_list=[email],
            fail_silently=True,
        )

        logger.info(
            f'Query on register  from {first_name} {last_name} as chief'
        )

        return User.objects.create(**validated_data)
