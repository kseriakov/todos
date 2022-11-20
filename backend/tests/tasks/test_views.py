from faker import Faker
import pytest

from django.urls import reverse

from tasks.views import (
    MyTasksAPIView,
    TaskCreateAPIView,
    TaskChangeChiefAPIView,
    TaskChangeWorkerAPIView,
)


fake = Faker()


@pytest.mark.django_db
def test_my_tasks(task_factory, chief_user, get_auth_request):
    task_factory()
    task_factory(chief=chief_user)
    task_factory(chief=chief_user)

    path = reverse('my_tasks')

    response = get_auth_request(path, chief_user, MyTasksAPIView)
    assert response.status_code == 200
    assert response.data['count'] == 2


@pytest.mark.django_db
def test_task_create(post_auth_request, worker_user, chief_user):

    data = {
        'text': fake.sentence(nb_words=20),
        'worker_id': worker_user.pk,
        'date': fake.date_between_dates(date_start='+2d', date_end='+30d'),
    }

    path = reverse('task_create')
    response = post_auth_request(path, chief_user, data, TaskCreateAPIView)
    assert response.status_code == 201


@pytest.mark.django_db
def tast_create_with_invalid_data(post_auth_request, worker_user, chief_user):
    data = {'text': '', 'worker_id': worker_user.pk, 'date': ''}
    path = reverse('task_create')
    response = post_auth_request(path, chief_user, data, TaskCreateAPIView)
    assert response.status_code == 400


@pytest.mark.django_db
def test_chief_change_task(
    delete_auth_request, patch_auth_request, chief_user, task_factory
):
    task = task_factory(chief=chief_user)

    path = reverse('chief_task_change', kwargs={'pk': task.pk})
    response_update = patch_auth_request(
        path, task.pk, chief_user, {'is_closed': True}, TaskChangeChiefAPIView
    )
    assert response_update.status_code == 200

    response_delete = delete_auth_request(
        path, task.pk, chief_user, TaskChangeChiefAPIView
    )
    assert response_delete.status_code == 204


@pytest.mark.django_db
def test_delete_not_owned_task(delete_auth_request, chief_user, task_obj):
    path = reverse('chief_task_change', kwargs={'pk': task_obj.pk})
    response = delete_auth_request(
        path, task_obj.pk, chief_user, TaskChangeChiefAPIView
    )
    assert response.status_code == 403


@pytest.mark.django_db
def test_worker_change_task(
    delete_auth_request, patch_auth_request, task_factory, worker_user
):

    task = task_factory(worker=worker_user)

    path = reverse('worker_task_change', kwargs={'pk': task.pk})
    response_update = patch_auth_request(
        path,
        task.pk,
        worker_user,
        {'is_completed': True},
        TaskChangeWorkerAPIView,
    )
    assert response_update.status_code == 200

    response_invalid_update = patch_auth_request(
        path,
        task.pk,
        worker_user,
        {'is_closed': True},
        TaskChangeWorkerAPIView,
    )
    assert response_invalid_update.status_code == 403

    response_delete = delete_auth_request(
        path, task.pk, worker_user, TaskChangeWorkerAPIView
    )
    assert response_delete.status_code == 405
