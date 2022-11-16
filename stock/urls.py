from django.urls import path

from .views import (
    StockInAPIView,
    AddStockInAPIView,
    UpdateStockInAPIView,
    DeleteStockInAPIView
)

urlpatterns = [
    path('api/stockin', StockInAPIView.as_view(), name='stockin'),
    path('api/stockin/<int:id>', UpdateStockInAPIView.as_view(), name='update-stockin'),
    path('api/add-stockin', AddStockInAPIView.as_view(), name='add-stockin'),
    path('api/delete-stockin/<int:id>', DeleteStockInAPIView.as_view(), name='update-stockin'),
]
