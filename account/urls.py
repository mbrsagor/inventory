from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from .views import (
    CategoryViewSet,
    ProductViewset,
    PaymentViewset,
    SellViewset,
)

from rest_framework.routers import DefaultRouter
account_router = DefaultRouter()

account_router.register('category', CategoryViewSet)
account_router.register('product', ProductViewset)
account_router.register('payment', PaymentViewset)
account_router.register('sell', SellViewset)

urlpatterns = account_router.urls