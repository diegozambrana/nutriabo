import graphene
import graphql_jwt
from graphql_jwt.shortcuts import create_refresh_token, get_token
from service.schema.types import UserType
from django.contrib.auth import get_user_model

class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)
    token = graphene.String()
    refresh_token = graphene.String()
    
    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)
        firstName = graphene.String(required=True)
        lastName = graphene.String(required=True)

    def mutate(self, _, email, password, firstName, lastName):
        user = get_user_model()(
            email=email,
            first_name=firstName,
            last_name=lastName
        )
        user.set_password(password)
        user.save()

        token = get_token(user)
        refresh_token = create_refresh_token(user)
        
        return CreateUser(user=user, token=token, refresh_token=refresh_token)
    

class Mutation(graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    create_user = CreateUser.Field()