from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import UserTodos
from .forms import UserTodosCreateForm, UserTodosChangeForm


@admin.register(UserTodos)
class UserAdminTodos(UserAdmin):
    form = UserTodosChangeForm
    add_form = UserTodosCreateForm
    list_display = (
        'pk',
        'email',
        'first_name',
        'last_name',
        'position',
        'is_chief',
        'is_active',
    )
    list_display_links = ('pk', 'email')
    list_filter = ('is_chief', 'is_active',)
    search_fields = ('email', 'first_name', 'last_name', 'position', 'chief')
    list_per_page = 15
    readonly_fields = ('pk', 'date_created')
    ordering = ('date_created',)

    fieldsets = (
        (
            ('Личная информация'),
            {
                'fields': [
                    'first_name',
                    'last_name',
                    'email',
                    'birthdate',
                    'password',
                ]
            },
        ),
        (
            ('Служебные данные'),
            {
                'fields': [
                    'position',
                    'chief',
                    'is_chief',
                    'is_superuser',
                    'is_staff',
                    'is_active',
                    'date_created',
                ]
            },
        ),
    )

    add_fieldsets = (
        (
            None,
            {
                'classes': ('wide',),
                'fields': (
                    'email',
                    'first_name',
                    'last_name',
                    'chief',
                    'position',
                    'password1',
                    'password2',
                    'is_superuser',
                    'is_chief',
                    'birthdate',
                ),
            },
        ),
    )
