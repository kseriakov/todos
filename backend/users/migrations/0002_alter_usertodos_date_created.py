# Generated by Django 4.1.3 on 2022-11-04 08:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="usertodos",
            name="date_created",
            field=models.DateField(auto_now_add=True, verbose_name="Добавлен"),
        ),
    ]
