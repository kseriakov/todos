import pytest
from rest_framework.exceptions import ValidationError

from tasks.models import Task
from tasks.serializers import TaskSerializer, TaskCreateSerializer
from users.serializers import UserSerializer


@pytest.mark.django_db
def test_serialize_task(get_fake_task_data):
    fake_data = get_fake_task_data
    task_data = {
        'id': fake_data.pk,
        'worker': UserSerializer(fake_data.worker).data,
        'chief': UserSerializer(fake_data.chief).data,
        'text': fake_data.text,
        'date': fake_data.date.strftime('%Y-%m-%d'),
        'is_active': fake_data.is_active,
        'is_completed': fake_data.is_completed,
        'is_closed': fake_data.is_closed,
    }

    serializer = TaskSerializer(fake_data)
    assert serializer.data == task_data


@pytest.mark.django_db
def test_create_task_without_chief(task_obj):
    with pytest.raises(ValidationError) as error:
        serializer = TaskCreateSerializer(
            data={
                'text': task_obj.text,
                'worker_id': task_obj.worker.pk,
                'date': task_obj.date,
            }
        )
        assert serializer.is_valid() == True
        serializer.save()

    assert 'Serializer not get chief_id' in str(error.value)


@pytest.mark.django_db
def task_create(task_obj):
    serializer = TaskCreateSerializer(
        data={
            'text': task_obj.text,
            'worker_id': task_obj.worker.pk,
            'date': task_obj.date,
            'chief_id': task_obj.chief.pk,
        }
    )
    assert serializer.is_valid() == True
    serializer.save()
    assert serializer.data['chief_id'] == task_obj.chief.pk
