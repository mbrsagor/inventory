from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from .views import (
    VendorListApi,
    CreateVendorListApi,
    UpdateVendorListApi,
    DeleteVendorListApi,
    UserCreateAPIView,
    ListUserAPIView,
    DeleteUserAPIView,
    UpdateUserAPIView,
)

from django.views.generic import TemplateView

urlpatterns = [
    # path('login', TemplateView.as_view(template_name='auth/base_auth.html'), name='login'),
    path('api/vendor', VendorListApi.as_view(), name='vender'),
    path('api/vendor/<int:id>', UpdateVendorListApi.as_view(), name='update-vender'),
    path('api/add-vendor', CreateVendorListApi.as_view(), name='add-vender'),
    path('api/delete-vendor/<int:id>', DeleteVendorListApi.as_view(), name='delete-vender'),
    path('api/add-user', UserCreateAPIView.as_view(), name='create-user'),
    path('api/users', ListUserAPIView.as_view(), name='users'),
    path('api/users/<int:id>', UpdateUserAPIView.as_view(), name='update-user'),
    path('api/delete-user/<int:id>', DeleteUserAPIView.as_view(), name='delete-user'),
]

if settings.DEBUG:
    urlpatterns+=static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns+=static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)