# Generated by Django 4.2.6 on 2024-04-02 11:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('firstapp', '0047_delete_clients_delete_sitelogs_delete_sitesettings'),
    ]

    operations = [
        migrations.CreateModel(
            name='Clients',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('TouristName', models.CharField(max_length=200)),
                ('TouristBirth', models.DateField()),
                ('TouristAdress', models.CharField(max_length=200)),
                ('TouristIIN', models.CharField(max_length=50)),
                ('TouristPassNumber', models.CharField(max_length=50)),
                ('TouristPassEx', models.DateField()),
                ('TouristTel', models.CharField(max_length=20)),
                ('TouristRoomType', models.CharField(max_length=20)),
                ('TouristFoodType', models.CharField(max_length=20)),
                ('TourSummary', models.CharField(max_length=50)),
                ('TourDiscount', models.CharField(max_length=50)),
                ('TouristPay', models.CharField(max_length=50)),
                ('TouristDebt', models.CharField(max_length=50)),
                ('TouristGroup', models.CharField(max_length=50)),
                ('PersonOne', models.CharField(max_length=50)),
                ('PersonTwo', models.CharField(max_length=50)),
                ('PersonThree', models.CharField(max_length=50)),
                ('PersonFour', models.CharField(max_length=50)),
                ('RegistManager', models.CharField(max_length=200)),
                ('DateRegist', models.DateTimeField(auto_now=True)),
                ('ConfirmBuh', models.CharField(max_length=200)),
                ('StatusPay', models.CharField(max_length=50)),
                ('TouristLogin', models.CharField(max_length=100)),
                ('TouristPass', models.CharField(max_length=100)),
                ('TouristLastLogin', models.DateTimeField(auto_now=True)),
                ('Comments', models.CharField(max_length=200)),
                ('TourID', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='SiteLogs',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('EventDateTime', models.DateTimeField(auto_now=True)),
                ('UserInfo', models.CharField(max_length=200)),
                ('Action', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='SiteSettings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('SettingsType', models.CharField(max_length=50)),
                ('Block', models.CharField(default='---', max_length=50)),
                ('NoticeInfo', models.CharField(default='---', max_length=500)),
                ('CurrencyInfo', models.CharField(max_length=10)),
                ('TimeInfo', models.CharField(max_length=10)),
            ],
        ),
    ]