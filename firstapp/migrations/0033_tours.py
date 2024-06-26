# Generated by Django 4.2.6 on 2024-03-01 17:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('firstapp', '0032_delete_tours'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tours',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('FlightType', models.CharField(max_length=200)),
                ('PaketName', models.CharField(max_length=200)),
                ('TourRoute', models.CharField(max_length=200)),
                ('DepartureFromOrigin', models.DateTimeField(blank=True)),
                ('TransitToArrival', models.DateTimeField(blank=True, default=None, null=True)),
                ('TransitToDeparture', models.DateTimeField(blank=True, default=None, null=True)),
                ('ArrivalDestination', models.DateTimeField(blank=True)),
                ('WaitingTimeTo', models.CharField(max_length=50)),
                ('DepartureFromDestination', models.DateTimeField(blank=True)),
                ('TransitFromArrival', models.DateTimeField(blank=True, default=None, null=True)),
                ('TransitFromDeparture', models.DateTimeField(blank=True, default=None, null=True)),
                ('ArrivalOrigin', models.DateTimeField(blank=True)),
                ('WaitingTimeFrom', models.CharField(max_length=50)),
                ('TouristQuantity', models.SmallIntegerField()),
                ('HotelMekka', models.CharField(max_length=200)),
                ('HotelMekkaIn', models.DateTimeField(blank=True)),
                ('HotelMekkaOut', models.DateTimeField(blank=True)),
                ('HotelMedina', models.CharField(max_length=200)),
                ('HotelMedinaIn', models.DateTimeField(blank=True)),
                ('HotelMedinaOut', models.DateTimeField(blank=True)),
                ('FoodChoose', models.CharField(max_length=200)),
                ('GidChoose', models.CharField(max_length=200)),
                ('TransferChoose', models.CharField(max_length=200)),
                ('TourDeadline', models.DateTimeField(blank=True)),
                ('FlightTicketPrice', models.CharField(max_length=200)),
                ('TouristVisaPrice', models.CharField(max_length=200)),
                ('MekkaHotelPrice', models.CharField(max_length=200)),
                ('MedinaHotelPrice', models.CharField(max_length=200)),
                ('TourFoodPrice', models.CharField(max_length=200)),
                ('TransferPrice', models.CharField(max_length=200)),
                ('HadjKitPrice', models.CharField(max_length=200)),
                ('GidPrice', models.CharField(max_length=200)),
                ('Comission', models.CharField(max_length=200)),
                ('TourDiscount', models.CharField(max_length=200)),
                ('TourSummary', models.CharField(max_length=200)),
                ('TourCreateDate', models.DateTimeField(blank=True)),
            ],
        ),
    ]
