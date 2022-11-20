from django.contrib import admin

from .models import Task


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'worker',
        'chief',
        'date',
        'is_active',
        'is_completed',
        'is_closed',
    )
    list_display_links = ('pk', 'worker')
    search_fields = ('worker', 'chief', 'text')
