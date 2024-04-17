# Generated by Django 4.2.6 on 2024-03-06 17:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('firstapp', '0040_delete_settings'),
    ]

    operations = [
        migrations.CreateModel(
            name='Settings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('SettingsType', models.CharField(max_length=50)),
                ('Block', models.CharField(max_length=50)),
                ('NoticeInfo', models.CharField(max_length=500)),
                ('CurrencyInfo', models.CharField(max_length=10)),
                ('TimeInfo', models.CharField(max_length=10)),
            ],
        ),
    ]
