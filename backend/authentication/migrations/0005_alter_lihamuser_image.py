# Generated by Django 5.1.4 on 2025-01-12 08:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0004_alter_lihamuser_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lihamuser',
            name='image',
            field=models.ImageField(default='default.jpg', null=True, upload_to='profile_pics'),
        ),
    ]
