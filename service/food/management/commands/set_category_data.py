from django.core.management.base import BaseCommand
from food.models import Alimento, Categoria


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('--id_category', type=int)
        parser.add_argument('--start_id', type=int)
        parser.add_argument('--end_id', type=int)

    def handle(self, *args, **options):
        if options['id_category'] and options['start_id'] and options['end_id']:
            categoria = Categoria.objects.get(id=options['id_category'])
            print(categoria)
            aliments = Alimento.objects.filter(
                id__in=range(options['start_id'], options['end_id'] + 1)
            )
            for index, aliment in enumerate(aliments):
                print(categoria.codigo)
                print(categoria.codigo + str(index + 1))
                aliment.categoria = categoria
                aliment.codigo = categoria.codigo + str(index + 1)
                aliment.save()
