from typing import Any, Callable
from faker import Faker
from pytest_factoryboy import register
import pytest


from rest_framework.test import APIRequestFactory, force_authenticate
from django.db import connection
from rest_framework.views import APIView
from users.models import UserTodos

from tests.factories import UserFactory, TaskFactory


fake = Faker()

register(TaskFactory)
register(UserFactory)

# Чтобы пользователь todos мог создавать базы данных для тестов
# ему надо назначить права - ALTER USER todos CREATEDB


@pytest.fixture
def worker_user(db, user_factory):
    user = user_factory()
    yield user
    user.delete()


@pytest.fixture
def chief_user(db, user_factory):
    user = user_factory(is_chief=True)
    yield user
    user.delete()


@pytest.fixture
def superuser(db, user_factory):
    user = user_factory(is_superuser=True)
    yield user
    user.delete()


# Фикстура для выполнения запросов к API
@pytest.fixture
def get_auth_request() -> Callable[[str, UserTodos, APIView], Any]:
    def inner(path: str, user: UserTodos, ViewClass: APIView):
        api_client = APIRequestFactory()
        request = api_client.get(path)
        force_authenticate(request, user)
        view = ViewClass.as_view()
        response = view(request)
        return response

    return inner


@pytest.fixture
def post_auth_request() -> Callable[[str, UserTodos, dict, APIView], Any]:
    def inner(path: str, user: UserTodos, body: dict, ViewClass: APIView):
        api_client = APIRequestFactory()
        request = api_client.post(path, body)
        force_authenticate(request, user)
        view = ViewClass.as_view()
        response = view(request)
        return response

    return inner


@pytest.fixture
def delete_auth_request() -> Callable[[str, int, UserTodos, APIView], Any]:
    def inner(path: str, pk: int, user: UserTodos, ViewClass: APIView):
        api_client = APIRequestFactory()
        request = api_client.delete(path)
        force_authenticate(request, user)
        view = ViewClass.as_view()
        response = view(request, pk=pk)
        return response

    return inner


@pytest.fixture
def patch_auth_request() -> Callable[[str, int, UserTodos, dict, APIView], Any]:
    def inner(
        path: str, pk: int, user: UserTodos, body: dict, ViewClass: APIView
    ):
        api_client = APIRequestFactory()
        request = api_client.patch(path, body)
        force_authenticate(request, user)
        view = ViewClass.as_view()
        response = view(request, pk=pk)
        return response

    return inner


@pytest.fixture
def get_fake_user_data():
    return {
        'email': fake.free_email(),
        'first_name': fake.first_name(),
        'last_name': fake.last_name(),
        'birthdate': fake.date_of_birth(minimum_age=20, maximum_age=50),
        'position': fake.job(),
        'chief_id': 111,
    }


# Task=====================================================================


@pytest.fixture
def task_obj(db, task_factory):
    return task_factory()


@pytest.fixture
def get_fake_task_data(task_factory):
    return task_factory.build()
