from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from django import forms

from .models import UserTodos


class UserTodosChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = UserTodos
        fields = (
            'email',
            'first_name',
            'last_name',
            'position',
            'chief',
            'is_superuser',
            'is_chief',
            'birthdate',
        )


class UserTodosCreateForm(UserCreationForm):
    password1 = forms.CharField(
        max_length=50,
        help_text='Минимум 4 символа',
        label='Пароль',
        widget=forms.PasswordInput(),
    )
    password2 = forms.CharField(
        max_length=50,
        help_text='Минимум 4 символа',
        label='Подтверджение пароля',
        widget=forms.PasswordInput(),
    )

    class Meta:
        model = UserTodos
        fields = (
            'email',
            'first_name',
            'last_name',
            'position',
            'password1',
            'password2',
            'chief',
            'is_superuser',
            'is_chief',
            'birthdate',
        )

    def _post_clean(self):
        super(forms.ModelForm, self)._post_clean()

        if not self.errors and len(self.cleaned_data.get('password2')) < 4:
            self.add_error(
                'password1', 'Пароль не может быть короче 4 символов'
            )
            self.add_error(
                'password2', 'Пароль не может быть короче 4 символов'
            )
