# Generated by Django 5.0.3 on 2024-03-28 18:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('team_api', '0002_alter_teammember_email_alter_teammember_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='teammember',
            name='deletedAt',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
