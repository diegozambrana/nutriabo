# Generated by Django 3.1.7 on 2022-04-13 19:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Categoria',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('codigo', models.CharField(max_length=1)),
                ('grupo_categoria', models.CharField(max_length=128)),
            ],
        ),
        migrations.CreateModel(
            name='Alimento',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('codigo', models.CharField(max_length=32, verbose_name='Código')),
                ('nombre', models.CharField(max_length=128, verbose_name='Nombre Alimento')),
                ('energia', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True, verbose_name='Energía')),
                ('humedad', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True, verbose_name='Humedad')),
                ('proteina', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True, verbose_name='Proteina')),
                ('grasa', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True, verbose_name='Grasa')),
                ('cho_total', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True, verbose_name='CHO Total')),
                ('fibra_cruda', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True, verbose_name='Fibra Cruda')),
                ('ceniza', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True, verbose_name='Ceniza')),
                ('calcio', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True, verbose_name='Calcio')),
                ('fosforo', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True, verbose_name='Fósforo')),
                ('hierro', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True, verbose_name='Hierro')),
                ('vitamina_A', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True, verbose_name='Vitamina A')),
                ('tiamina', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True, verbose_name='Tiamina')),
                ('riboflav', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True, verbose_name='Riboflav')),
                ('niacina', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True, verbose_name='Niacina')),
                ('vintamina_C', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True, verbose_name='Vitamina C')),
                ('consolutar', models.BooleanField(default=False)),
                ('nuevo', models.BooleanField(default=False)),
                ('alimento_fortificado', models.BooleanField(default=False)),
                ('alimento_extrafortificado', models.BooleanField(default=False)),
                ('trazas', models.BooleanField(default=False)),
                ('cero', models.BooleanField(default=False)),
                ('categoria', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='food.categoria')),
            ],
        ),
    ]
