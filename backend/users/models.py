from django import dispatch
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

    _is_active_chief = models.BooleanField(blank=True, null=True)

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

    @property
    def is_active_chief(self):
        return self._is_active_chief

    @is_active_chief.setter
    def is_active_chief(self, status: bool):
        self._is_active_chief = status

    def __str__(self):
        return self.get_full_name

    def __init__(self, *args, **kwargs):
        if not kwargs.get('is_chief'):
            return super().__init__(*args, **kwargs)

        if not kwargs.get('is_active'):
            self.is_active_chief = False

        return super().__init__(*args, **kwargs)

    def save(self, *args, **kwargs):
        if (
            self.is_chief
            and self.is_active
            and self.is_active != self.is_active_chief
        ):
            self.is_active_chief = self.is_active
            activate_chief.send(sender=self.__class__, chief=self)

        return super().save(*args, **kwargs)


activate_chief = dispatch.Signal()
