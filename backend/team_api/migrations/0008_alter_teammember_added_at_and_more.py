# Generated by Django 5.0.3 on 2024-04-08 22:25

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('team_api', '0007_alter_teammember_role'),
    ]

    operations = [
        migrations.AlterField(
            model_name='teammember',
            name='added_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='teammember',
            name='updated_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
