from django.http import HttpResponse
from django.views.generic import View
from .utils import render_to_pdf
from django.template.loader import get_template
from stock.models import StockIn
from django.shortcuts import get_object_or_404


class GeneratePDF(View):
     def get(self, request, id,*args, **kwargs):
         invoice_context = get_object_or_404(StockIn, id=id)
         template = get_template('invoice.html')
         context = {
             "invoice": invoice_context
         }
         print(context)
         html = template.render(context)
         pdf = render_to_pdf('invoice.html', context)
         if pdf:
             response = HttpResponse(pdf, content_type='application/pdf')
             filename = "Invoice_%s.pdf" %("12341231")
             content = "inline; filename='%s'" %(filename)
             download = request.GET.get("download")
             if download:
                 content = "attachment; filename='%s'" %(filename)
             response['Content-Disposition'] = content
             return response
         return HttpResponse("Not found")