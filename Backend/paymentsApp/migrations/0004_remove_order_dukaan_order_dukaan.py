# Generated by Django 4.0.3 on 2022-11-30 18:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0004_subcart_cart'),
        ('paymentsApp', '0003_order_dukaan'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='dukaan',
        ),
        migrations.AddField(
            model_name='order',
            name='dukaan',
            field=models.ManyToManyField(to='mainApp.dukaan'),
        ),
    ]
