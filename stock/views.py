from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    RetrieveAPIView,
    RetrieveUpdateAPIView,
    DestroyAPIView,
)
from rest_framework.permissions import (
    IsAdminUser,
    IsAuthenticated,
)

from .models import StockIn
from .serializers import StockinSerializers


class StockInAPIView(ListAPIView):
    queryset = StockIn.objects.all()
    serializer_class = StockinSerializers
    permission_classes = [IsAuthenticated]


class AddStockInAPIView(CreateAPIView):
    queryset = StockIn.objects.all()
    serializer_class = StockinSerializers
    permission_classes = [IsAuthenticated]


class UpdateStockInAPIView(RetrieveUpdateAPIView):
    queryset = StockIn.objects.all()
    serializer_class = StockinSerializers
    lookup_field = 'id'
    permission_classes = [IsAuthenticated]


class DeleteStockInAPIView(DestroyAPIView):
    queryset = StockIn.objects.all()
    serializer_class = StockinSerializers
    lookup_field = 'id'
    permission_classes = [IsAuthenticated]
