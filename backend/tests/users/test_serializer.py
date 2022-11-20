from users.serializers import UserSerializer
from users.models import UserTodos


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
