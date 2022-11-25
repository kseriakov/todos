from faker import Faker
import pytest
from users.forms import UserTodosCreateForm


fake = Faker()


@pytest.mark.django_db
def test_create_user_with_invalid_password(get_fake_user_data):
    password = fake.pyint(min_value=1, max_value=2)
    get_fake_user_data.update(
        {
            'password1': password,
            'password2': password,
            'is_superuser': False,
        }
    )
    form = UserTodosCreateForm(data=get_fake_user_data)

    assert form.is_valid() == False
    assert form.has_error('password1') == True
    assert form.has_error('password2') == True
