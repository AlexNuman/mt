# Generated by Django 4.2.6 on 2024-04-05 16:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('firstapp', '0050_sitelogs'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='user_regist_date',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
