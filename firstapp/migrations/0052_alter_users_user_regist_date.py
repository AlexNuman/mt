# Generated by Django 4.2.6 on 2024-04-05 17:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('firstapp', '0051_alter_users_user_regist_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='user_regist_date',
            field=models.DateTimeField(),
        ),
    ]