from django.shortcuts import redirect, get_object_or_404
from .models import (
    Category,
    Product,
    Payment,
    Sell
)
from .serializers import (
    CategorySerializer,
    ProductSerializer,
    PaymentSerializer,
    SellSerializer
)
from rest_framework.permissions import (
    IsAdminUser,
    IsAuthenticated
)
from rest_framework.viewsets import ModelViewSet


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]


class ProductViewset(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]


class PaymentViewset(ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]


class SellViewset(ModelViewSet):
    queryset = Sell.objects.all()
    serializer_class = SellSerializer
    permission_classes = [IsAuthenticated]
