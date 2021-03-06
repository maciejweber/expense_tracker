# Generated by Django 3.1.5 on 2021-01-10 20:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Receipt',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('value', models.DecimalField(decimal_places=2, max_digits=5)),
                ('info', models.CharField(max_length=128)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='author', to=settings.AUTH_USER_MODEL)),
                ('users', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='users', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
