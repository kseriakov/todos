import datetime
from faker import Faker
from factory.django import DjangoModelFactory
import factory


fake = Faker()


class UserFactory(DjangoModelFactory):
    class Meta:
        model = 'users.UserTodos'

    first_name = factory.LazyFunction(lambda: fake.first_name())
    last_name = factory.LazyFunction(lambda: fake.last_name())
    email = factory.LazyAttribute(
        lambda x: f'{x.first_name}{x.last_name}@mail.ru'
    )
    birthdate = factory.LazyFunction(
        lambda: fake.date_of_birth(minimum_age=20, maximum_age=50)
    )
    position = factory.LazyFunction(lambda: fake.job())

    # Предотвращаем рекурсию (chief=None)
    chief = factory.SubFactory('tests.factories.UserFactory', chief=None)
    date_created = factory.LazyFunction(lambda: datetime.datetime.now().date())
    is_active = True
    is_staff = False
    is_chief = False
    is_superuser = False

    @classmethod
    def _create(cls, model_class, *args, **kwargs):
        manager = cls._get_manager(model_class)

        if kwargs.get('is_superuser'):
            return manager.create_superuser(
                send_email_with_password=False, **kwargs
            )

        return manager.create(send_email_with_password=False, **kwargs)


class TaskFactory(DjangoModelFactory):
    text = factory.LazyFunction(lambda: fake.sentence(nb_words=20))
    chief = factory.SubFactory(UserFactory)
    worker = factory.SubFactory(UserFactory)
    date = factory.LazyFunction(
        lambda: fake.date_between_dates(date_start='+2d', date_end='+30d')
    )

    is_active = True
    is_completed = False
    is_closed = False

    class Meta:
        model = 'tasks.Task'
