import csv

from django.core.management.base import BaseCommand
from food.models import Alimento


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('--tsv_path', type=str)

    def handle(self, *args, **options):
        if options['tsv_path']:
            print('loading file',options['tsv_path'])
            with open(options['tsv_path'], 'r') as tsv_file:
                read_tsv = csv.reader(tsv_file, delimiter="\t")
                next(read_tsv, None)
                for row in read_tsv:
                    codigo = str(row[0])
                    nombre = row[1].capitalize()
                    energia = float(row[2].replace(',', '.'))
                    humedad = float(row[3].replace(',', '.'))
                    proteina = float(row[4].replace(',', '.'))
                    grasa = float(row[5].replace(',', '.'))
                    cho_total = float(row[6].replace(',', '.'))
                    fibra_cruda = float(row[7].replace(',', '.'))
                    ceniza = float(row[8].replace(',', '.'))
                    calcio = float(row[9].replace(',', '.'))
                    fosforo = float(row[10].replace(',', '.'))
                    hierro = float(row[11].replace(',', '.'))
                    vitamina_A = float(row[12].replace(',', '.'))
                    tiamina = float(row[13].replace(',', '.'))
                    riboflav = float(row[14].replace(',', '.'))
                    niacina = float(row[15].replace(',', '.'))
                    vintamina_C = float(row[16].replace(',', '.'))

                    aliment, created = Alimento.objects.get_or_create(
                        codigo=codigo,
                        nombre=nombre,
                        energia=energia,
                        humedad=humedad,
                        proteina=proteina,
                        grasa=grasa,
                        cho_total=cho_total,
                        fibra_cruda=fibra_cruda,
                        ceniza=ceniza,
                        calcio=calcio,
                        fosforo=fosforo,
                        hierro=hierro,
                        vitamina_A=vitamina_A,
                        tiamina=tiamina,
                        riboflav=riboflav,
                        niacina=niacina,
                        vintamina_C=vintamina_C,
                    )
                    if created:
                        print('> created: ', aliment.nombre)
                    else:
                        print("NO CREATED", aliment.nombre)