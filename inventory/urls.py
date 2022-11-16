from django.contrib import admin
from django.urls import path, include
from django.conf import settings

from django.conf.urls.static import static
from .views import GeneratePDF
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('account.urls')),
    path('stock/', include('stock.urls')),
    path('agents/', include('agents.urls')),
    path('api/rest-auth/', include('rest_auth.urls')),
    # pdf stock
    path('pdf/<int:id>', GeneratePDF.as_view(), name='pdf'),
    path('', TemplateView.as_view(template_name='app/base.html'), name='dashboard'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
