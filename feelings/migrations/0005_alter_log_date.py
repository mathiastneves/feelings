# Generated by Django 4.1.2 on 2022-11-23 19:37

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feelings', '0004_remove_log_timestamp_log_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='log',
            name='date',
            field=models.DateField(default=datetime.datetime(2022, 11, 23, 19, 37, 56, 518768, tzinfo=datetime.timezone.utc)),
        ),
    ]
