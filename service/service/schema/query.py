import graphene
from service.schema.types import UserType, AlimentType, CategoryType
from food.models import Alimento

class Query(graphene.ObjectType):
    whoami = graphene.Field(UserType)
    all_aliments = graphene.List(AlimentType)
    get_aliment_by_code = graphene.Field(
        AlimentType,
        codigo=graphene.String(required=True)
    )

    def resolve_whoami(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Authentication Failure: Your must be signed in')
        return user
    
    def resolve_all_aliments(self, info):
        return Alimento.objects.all();

    def resolve_get_aliment_by_code(self, info, codigo):
        try:
            return Alimento.objects.get(codigo=codigo)
        except Alimento.DoesNotExist:
            return None