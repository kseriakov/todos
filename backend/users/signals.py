from django.dispatch import receiver
from django.contrib.auth import get_user_model

from todos.settings import SITE_NAME, DEFAULT_FROM_EMAIL

from .tasks import send_no_blocking_mail
from .models import activate_chief


@receiver(activate_chief, sender=get_user_model())
def activation_chief_profile(sender, **kwargs):
    chief = kwargs.get('chief')
    send_no_blocking_mail(
        subject=f'Активация профиля на сайте {SITE_NAME}',
        message='Ваш профиль успешно активирован! Войдите на сайт, используя логин и пароль, '
        'которые вы указали при регистрации',
        from_email=DEFAULT_FROM_EMAIL,
        recipient_list=[chief.email],
    )
