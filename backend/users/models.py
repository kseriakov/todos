from django.db import models
from django.utils import timezone
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
)

from .manager import UserTodosManager


class UserTodos(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        max_length=100,
        verbose_name='Email адрес',
        unique=True,
    )
    first_name = models.CharField(max_length=100, verbose_name='Имя')
    last_name = models.CharField(max_length=100, verbose_name="Фамилия")
    birthdate = models.DateField(
        verbose_name='День рождения', blank=True, null=True
    )
    position = models.CharField(
        max_length=200,
        verbose_name='Должность',
    )
    chief = models.ForeignKey(
        'self',
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        verbose_name='Руководитель',
        related_name='workers',
    )
    date_created = models.DateField(
        auto_now_add=timezone.now(), verbose_name='Добавлен'
    )
    is_active = models.BooleanField(
        default=True, verbose_name='Профиль активен?'
    )
    is_staff = models.BooleanField(default=False, verbose_name='Администратор?')
    is_chief = models.BooleanField(default=False, verbose_name='Руководитель?')

    objects = UserTodosManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['last_name', 'first_name', 'position']

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    @property
    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'

    @property
    def get_short_name(self):
        return self.last_name

    def __str__(self):
        return self.get_full_name

    def save(self, **kwargs):
        return super().save(**kwargs)
