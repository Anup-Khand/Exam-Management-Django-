# Generated by Django 5.0.4 on 2024-06-01 10:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('semester', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='semester',
            name='sem',
            field=models.CharField(max_length=255, unique=True),
        ),
    ]
