from faker import Faker
from todos.settings import DEFAULT_FROM_EMAIL
from users.serializers import ChiefCreateSerilaizer, UserSerializer
from users.models import UserTodos

fake = Faker()


def test_chief_create_serializer(mailoutbox, chief_user):
    chief_data = {
        'email': fake.free_email(),
        'first_name': chief_user.first_name,
        'last_name': chief_user.last_name,
        'birthdate': chief_user.birthdate.strftime('%Y-%m-%d'),
        'position': chief_user.position,
        'password': fake.pyint(min_value=4, max_value=5),
    }

    serializer = ChiefCreateSerilaizer(data=chief_data)
    assert serializer.is_valid() == True
    chief = serializer.save()
    assert chief.is_chief == True


def test_worker_user_serializer(worker_user: UserTodos):

    user_data = {
        'id': worker_user.pk,
        'email': worker_user.email,
        'first_name': worker_user.first_name,
        'last_name': worker_user.last_name,
        'birthdate': worker_user.birthdate.strftime('%Y-%m-%d'),
        'position': worker_user.position,
        'chief_id': worker_user.chief.pk,
        'is_chief': worker_user.is_chief,
        'is_active': worker_user.is_active,
        'tasks': [],
    }
    serializer = UserSerializer(worker_user)
    assert user_data == serializer.data
