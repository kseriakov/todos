# Generated by Django 4.1.3 on 2022-11-26 03:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0004_alter_usertodos_options_usertodos_chief"),
    ]

    operations = [
        migrations.AddField(
            model_name="usertodos",
            name="_is_active_chief",
            field=models.BooleanField(blank=True, null=True),
        ),
    ]