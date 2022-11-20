from django.urls import reverse

from users.views import (
    AllActiveUsersAPIView,
    ChiefWorkersListView,
    CreateWorkerAPIView,
    DeleteWorkerAPIView,
)


def test_all_active_users(get_auth_request, chief_user):
    path = reverse('all_users')
    response = get_auth_request(path, chief_user, AllActiveUsersAPIView)
    assert response.status_code == 200
    # Получаем 2 объекта, т.к. SubFactory - создал для пользователя в БД - chief'a
    assert response.data['count'] == 2


def test_chief_workers_list(get_auth_request, chief_user, user_factory):
    worker = user_factory(chief=chief_user)
    path = reverse('chief_workers')
    response = get_auth_request(path, chief_user, ChiefWorkersListView)
    assert len(response.data['workers']) == 1
    assert response.data['workers'][0]['id'] == worker.pk


def test_create_worker(post_auth_request, chief_user, get_fake_user_data):
    path = reverse('create_worker')
    body = get_fake_user_data
    response = post_auth_request(path, chief_user, body, CreateWorkerAPIView)
    assert response.status_code == 201
    assert response.data['chief_id'] == chief_user.pk


def test_delete_woker(delete_auth_request, chief_user, user_factory):
    worker = user_factory(chief=chief_user)
    path = reverse('delete_worker', kwargs={'pk': worker.pk})
    response = delete_auth_request(
        path, worker.pk, chief_user, DeleteWorkerAPIView
    )
    assert response.status_code == 204


def test_deleted_not_owned_user(delete_auth_request, worker_user, chief_user):
    path = reverse('delete_worker', kwargs={'pk': worker_user.pk})
    response = delete_auth_request(
        path, worker_user.pk, chief_user, DeleteWorkerAPIView
    )
    assert response.status_code == 403


def test_not_worker_create_user(
    post_auth_request, worker_user, get_fake_user_data
):
    path = reverse('create_worker')
    body = get_fake_user_data
    response = post_auth_request(path, worker_user, body, CreateWorkerAPIView)
    assert response.status_code == 403


def test_delete_not_existing_worker(delete_auth_request, chief_user):
    path = reverse('delete_worker', kwargs={'pk': 1111})
    response = delete_auth_request(path, 1111, chief_user, DeleteWorkerAPIView)
    assert response.status_code == 400


def test_create_invalid_worker(
    post_auth_request, chief_user, get_fake_user_data
):
    path = reverse('create_worker')
    body = get_fake_user_data | {'email': ''}
    response = post_auth_request(path, chief_user, body, CreateWorkerAPIView)
    assert response.status_code == 400
