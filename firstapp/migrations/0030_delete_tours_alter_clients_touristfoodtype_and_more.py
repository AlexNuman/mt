# Generated by Django 4.2.6 on 2024-02-03 20:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('firstapp', '0029_clients'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Tours',
        ),
        migrations.AlterField(
            model_name='clients',
            name='TouristFoodType',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='clients',
            name='TouristRoomType',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='clients',
            name='TouristTel',
            field=models.CharField(max_length=20),
        ),
    ]
