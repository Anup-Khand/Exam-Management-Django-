# Generated by Django 5.0.4 on 2024-06-11 06:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('subject', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='subject',
            old_name='syallabus',
            new_name='syllabus',
        ),
    ]
