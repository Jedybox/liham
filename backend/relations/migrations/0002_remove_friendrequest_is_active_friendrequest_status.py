# Generated by Django 5.1.4 on 2025-01-14 09:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('relations', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='friendrequest',
            name='is_active',
        ),
        migrations.AddField(
            model_name='friendrequest',
            name='status',
            field=models.CharField(default='pending', max_length=50),
        ),
    ]
