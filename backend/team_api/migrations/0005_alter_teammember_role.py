# Generated by Django 5.0.3 on 2024-03-29 01:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('team_api', '0004_rename_addedat_teammember_added_at_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='teammember',
            name='role',
            field=models.CharField(choices=[('ADMIN', 'admin'), ('REGULAR', 'regular')], default='regular', max_length=15),
        ),
    ]
