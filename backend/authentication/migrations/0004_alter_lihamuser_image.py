# Generated by Django 5.1.4 on 2025-01-12 08:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_lihamuser_is_active'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lihamuser',
            name='image',
            field=models.ImageField(blank=True, default='default.jpg', upload_to='profile_pics'),
        ),
    ]
