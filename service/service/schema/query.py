import graphene
from service.schema.types import UserType

class Query(graphene.ObjectType):
    hello = graphene.String(default_value="Hi!")
    whoami = graphene.Field(UserType)

    def resolve_whoami(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Authentication Failure: Your must be signed in')
        return user