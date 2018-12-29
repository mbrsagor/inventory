from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    RetrieveAPIView,
    RetrieveUpdateAPIView,
    DestroyAPIView,
)
from rest_framework.permissions import (
    IsAdminUser,
    AllowAny,
    IsAuthenticated
)
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView

from .models import Vendors

from .serializers import (
    VendorSerializers, 
    UserCreateSerializer, 
)


class VendorListApi(ListAPIView):
    queryset           = Vendors.objects.all()
    serializer_class   = VendorSerializers
    permission_classes = [IsAuthenticated]


class CreateVendorListApi(CreateAPIView):
    queryset           = Vendors.objects.all()
    serializer_class   = VendorSerializers
    permission_classes = [IsAuthenticated]


class UpdateVendorListApi(RetrieveUpdateAPIView):
    queryset           = Vendors.objects.all()
    serializer_class   = VendorSerializers
    lookup_field       = 'id'
    permission_classes = [IsAuthenticated]


class DeleteVendorListApi(DestroyAPIView):
    queryset           = Vendors.objects.all()
    serializer_class   = VendorSerializers
    lookup_field       = 'id'
    permission_classes = [IsAuthenticated]



class UserCreateAPIView(CreateAPIView):
    queryset           = User.objects.all()
    serializer_class   = UserCreateSerializer
    permission_classes = [IsAuthenticated]


class ListUserAPIView(ListAPIView):
    queryset           = User.objects.all()
    serializer_class   = UserCreateSerializer
    permission_classes = [IsAuthenticated]



class UpdateUserAPIView(RetrieveUpdateAPIView):
    queryset           = User.objects.all()
    serializer_class   = UserCreateSerializer
    lookup_field       = 'id'
    permission_classes = [IsAuthenticated]


class DeleteUserAPIView(DestroyAPIView):
    queryset           = User.objects.all()
    serializer_class   = UserCreateSerializer
    lookup_field       = 'id'
    permission_classes = [IsAuthenticated]

    # def delete(self, request, id):
    #     delObj = get_object_or_404(User, id)
    #     delObj.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)
