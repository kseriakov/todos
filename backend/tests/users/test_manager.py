import pytest


@pytest.mark.django_db
def test_create_user_without_email(user_factory):
    with pytest.raises(ValueError) as error:
        user_factory(email=None)
    assert str(error.value) == 'Field "email" is blank!'


@pytest.mark.django_db
def test_create_user_without_first_name(user_factory):
    with pytest.raises(ValueError) as error:
        user_factory(first_name=None)
    assert str(error.value) == 'Field "first_name" is blank!'


@pytest.mark.django_db
def test_create_user_without_last_name(user_factory):
    with pytest.raises(ValueError) as error:
        user_factory(last_name=None)
    assert str(error.value) == 'Field "last_name" is blank!'


@pytest.mark.django_db
def test_create_user_without_position(user_factory):
    with pytest.raises(ValueError) as error:
        user_factory(position=None)
    assert str(error.value) == 'Field "position" is blank!'
