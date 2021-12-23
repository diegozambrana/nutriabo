from django.db import models


class Categoria(models.Model):
    codigo = models.CharField(max_length=1)
    grupo_categoria = models.CharField(max_length=128)

    def __str__(self):
        return f"[{self.codigo}] {self.grupo_categoria}"


class Alimento(models.Model):
    categoria = models.ForeignKey('Categoria', on_delete=models.CASCADE)
    codigo = models.CharField(max_length=32, verbose_name="Código")
    nombre = models.CharField(max_length=128, verbose_name="Nombre Alimento")
    energia = models.DecimalField(
        null=True,
        blank=True,
        decimal_places=2,
        max_digits=10,
        verbose_name="Energía"
    )
    humedad = models.DecimalField(
        null=True,
        blank=True,
        decimal_places=2,
        max_digits=10,
        verbose_name="Humedad"
    )
    proteina = models.DecimalField(
        null=True,
        blank=True,
        decimal_places=2,
        max_digits=10,
        verbose_name="Proteina"
    )
    grasa = models.DecimalField(
        null=True,
        blank=True,
        decimal_places=2,
        max_digits=10,
        verbose_name="Grasa"
    )
    cho_total = models.DecimalField(
        null=True,
        blank=True,
        decimal_places=2,
        max_digits=10,
        verbose_name="CHO Total"
    ) #CHO TOTAL
    fibra_cruda = models.DecimalField(
        null=True,
        blank=True,
        decimal_places=2,
        max_digits=10,
        verbose_name="Fibra Cruda"
    )
    ceniza = models.DecimalField(
        null=True,
        blank=True,
        decimal_places=2,
        max_digits=10,
        verbose_name="Ceniza"
    )
    calcio = models.DecimalField(
        null=True,
        blank=True,
        decimal_places=2,
        max_digits=10,
        verbose_name="Calcio"
    )
    fosforo = models.DecimalField(
        null=True,
        blank=True,
        decimal_places=2,
        max_digits=10,
        verbose_name="Fósforo"
    )
    hierro = models.DecimalField(
        null=True,
        blank=True,
        decimal_places=2,
        max_digits=10,
        verbose_name="Hierro"
    )
    vitamina_A = models.DecimalField(
        null=True,
        blank=True,
        decimal_places=2,
        max_digits=10,
        verbose_name="Vitamina A"
    )
    tiamina = models.DecimalField(
        null=True,
        blank=True,
        decimal_places=2,
        max_digits=10,
        verbose_name="Tiamina"
    )
    riboflav = models.DecimalField(
        null=True,
        blank=True,
        decimal_places=2,
        max_digits=10,
        verbose_name="Riboflav"
    )
    niacina = models.DecimalField(
        null=True,
        blank=True,
        decimal_places=2,
        max_digits=10,
        verbose_name="Niacina"
    )
    vintamina_C = models.DecimalField(
        null=True,
        blank=True,
        decimal_places=2,
        max_digits=10,
        verbose_name="Vitamina C"
    )

    consolutar = models.BooleanField(default=False)
    nuevo = models.BooleanField(default=False)
    alimento_fortificado = models.BooleanField(default=False)
    alimento_extrafortificado = models.BooleanField(default=False)
    trazas = models.BooleanField(default=False)
    cero = models.BooleanField(default=False)
    

    def __str__(self):
        return f"{self.codigo} - {self.nombre}"