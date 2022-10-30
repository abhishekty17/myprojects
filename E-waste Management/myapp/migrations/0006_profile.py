# Generated by Django 4.1 on 2022-08-25 13:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0005_delete_profile'),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(max_length=122)),
                ('district', models.CharField(max_length=122)),
                ('city', models.CharField(max_length=122)),
                ('state', models.CharField(max_length=122)),
                ('pincode', models.CharField(max_length=122)),
                ('contact_no', models.CharField(max_length=12)),
            ],
        ),
    ]
