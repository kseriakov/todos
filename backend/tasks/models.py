from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class Task(models.Model):
    text = models.TextField(verbose_name='Содержание поручения')
    worker = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name='Сотрудник',
        related_name='worker_tasks',
    )
    chief = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name='Руководитель',
        related_name='chief_tasks',
    )
    date = models.DateField(verbose_name='Срок исполнения')
    is_active = models.BooleanField(
        default=True,
        verbose_name='В работе?',
    )
    is_completed = models.BooleanField(
        default=False,
        verbose_name='Выполнено?',
    )
    is_closed = models.BooleanField(
        default=False,
        verbose_name='Закрыто?',
    )

    class Meta:
        verbose_name = 'Поручение'
        verbose_name_plural = 'Поручения'

    def __str__(self):
        return f'Сотрудник: {self.worker}, руководитель: {self.chief}'
