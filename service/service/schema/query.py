import graphene
from service.schema.types import UserType, AlimentType, CategoryType
from food.models import Alimento, Categoria

class Query(graphene.ObjectType):
    whoami = graphene.Field(UserType)
    all_aliments = graphene.List(AlimentType)
    all_categories = graphene.List(CategoryType)
    get_aliment_by_code = graphene.Field(
        AlimentType,
        codigo=graphene.String(required=True)
    )
    search_aliment = graphene.List(
        AlimentType,
        search=graphene.String(required=True)
    )

    def resolve_whoami(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Authentication Failure: Your must be signed in')
        return user
    
    def resolve_all_aliments(self, info):
        return Alimento.objects.all();

    def resolve_all_categories(self, info):
        return Categoria.objects.all()

    def resolve_get_aliment_by_code(self, info, codigo):
        try:
            return Alimento.objects.get(codigo=codigo)
        except Alimento.DoesNotExist:
            return None
    
    def resolve_search_aliment(self, info, search):
        try:
            return Alimento.objects.filter(nombre__icontains=search)[:20]
        except Alimento.DoesNotExist:
            return None