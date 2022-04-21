from django.contrib.auth import get_user_model
from graphene_django import DjangoObjectType
from food.models import Alimento, Categoria


class CategoryType(DjangoObjectType):
    class Meta:
        model = Categoria


class AlimentType(DjangoObjectType):
    class Meta:
        model = Alimento


class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()