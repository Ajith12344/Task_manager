# Generated by Django 5.1.3 on 2024-11-12 22:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0002_remove_task_created_at_remove_task_updated_at_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='end_date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='task',
            name='start_date',
            field=models.DateField(),
        ),
    ]
