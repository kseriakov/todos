from django.contrib.auth.base_user import BaseUserManager
from django.core.validators import validate_email

from .tasks import send_no_blocking_mail
from todos.settings import SITE_NAME, DEFAULT_FROM_EMAIL, DOMAIN


class UserTodosManager(BaseUserManager):
    def __validate_kwargs(self, is_superuser=False, **kwargs):
        if not kwargs['email']:
            raise ValueError('Field "email" is blank!')

        email = kwargs['email']
        validate_email(email)
        email = self.normalize_email(email)
        kwargs.update({'email': email})

        if not kwargs['first_name']:
            raise ValueError('Field "first_name" is blank!')

        if not kwargs['last_name']:
            raise ValueError('Field "last_name" is blank!')

        if not kwargs['position']:
            raise ValueError('Field "position" is blank!')

        kwargs.update(
            {
                'is_staff': is_superuser,
                'is_superuser': is_superuser,
                'is_chief': is_superuser
                if is_superuser
                else (True if kwargs.get('is_chief') else False),
            }
        )

        if kwargs.get('password'):
            password = kwargs.pop('password')
        else:
            password = self.make_random_password(length=5)
            if self.__send_email:
                self.__send_password(password, email)

        return kwargs, password

    @staticmethod
    def __send_password(password, email):
        subject = f'Добро пожаловать на сайт {SITE_NAME}'
        html_message = (
            f'<h1>Для Вас создан профиль на сайте {SITE_NAME}</h1>'
            f'<p>Для входа на сайт <a href="{DOMAIN}">{DOMAIN}</a> используйте данный '
            f'адрес электронной почты и пароль: {password}</p>'
        )

        send_no_blocking_mail(
            subject=subject,
            message='',
            from_email=DEFAULT_FROM_EMAIL,
            recipient_list=[email],
            fail_silently=True,
            html_message=html_message,
        )

    def create(self, *, send_email_with_password=True, **kwargs):
        self.__send_email = send_email_with_password
        kwargs, password = self.__validate_kwargs(**kwargs)

        user = self.model(**kwargs)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, *, send_email_with_password=True, **kwargs):
        self.__send_email = send_email_with_password
        kwargs.update({'is_superuser': True})
        kwargs, password = self.__validate_kwargs(**kwargs)

        superuser = self.model(**kwargs)
        superuser.set_password(password)
        superuser.save(using=self._db)
        return superuser
