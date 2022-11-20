import pytest

from tasks.models import Task


@pytest.mark.django_db
def test_create_task(task_factory):
    task: Task = task_factory()
    assert task.is_active == True
    assert task.is_completed == False
    assert task.is_closed == False


@pytest.mark.django_db
def test_str_task(task_factory):
    task: Task = task_factory()
    assert (
        task.__str__() == f'Сотрудник: {task.worker}, руководитель: {task.chief}'
    )
