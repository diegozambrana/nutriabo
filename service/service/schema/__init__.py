import graphene
from service.schema.query import Query
from service.schema.mutation import Mutation


schema = graphene.Schema(query=Query, mutation=Mutation)
