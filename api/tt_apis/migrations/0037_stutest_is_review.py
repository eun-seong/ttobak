# Generated by Django 3.0.8 on 2020-10-12 08:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tt_apis', '0036_testcurrent_swp_passed'),
    ]

    operations = [
        migrations.AddField(
            model_name='stutest',
            name='is_review',
            field=models.CharField(choices=[('Y', 'yes'), ('N', 'no')], max_length=1, null=True),
        ),
    ]