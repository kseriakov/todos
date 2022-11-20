from users.models import UserTodos


def test_create_worker(worker_user: UserTodos):
    assert worker_user.is_active == True
    assert worker_user.is_chief == False
    assert worker_user.is_staff == False
    assert worker_user.is_superuser == False


def test_create_cheif(chief_user: UserTodos):
    assert chief_user.is_active == True
    assert chief_user.is_chief == True
    assert chief_user.is_staff == False
    assert chief_user.is_superuser == False


def test_create_superuser(superuser: UserTodos):
    assert superuser.is_active == True
    assert superuser.is_chief == True
    assert superuser.is_staff == True
    assert superuser.is_superuser == True


def test_full_name_user(worker_user: UserTodos):
    assert (
        worker_user.get_full_name == f'{worker_user.first_name} '
        f'{worker_user.last_name}'
    )
