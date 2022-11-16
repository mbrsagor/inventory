from django.db import models
from agents.models import Vendors
from django.db.models.signals import pre_save

from account.models import Product, Category, Payment


class StockIn(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="stockin_product")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="product_category")
    agent = models.ForeignKey(Vendors, on_delete=models.CASCADE, related_name="vendor")
    pay_status = models.ForeignKey(Payment, on_delete=models.CASCADE, related_name="payment_status")
    stock_in = models.IntegerField(default=0)
    stock_out = models.IntegerField(default=0)
    quantity = models.IntegerField(blank=True, null=True)
    price = models.IntegerField()
    deu_amount = models.IntegerField(blank=True, null=True)
    warranty = models.CharField(max_length=50, blank=True, null=True)
    wholesale = models.IntegerField()
    barcode = models.CharField(max_length=60)
    invoice = models.IntegerField(unique=True)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.product.product_name


def pre_save_receiver(sender, instance, *args, **kwargs):
    stk_quantity = int(instance.stock_in) - int(instance.stock_out)
    if stk_quantity > 0:
        instance.quantity = stk_quantity
        instance.stock_in = stk_quantity
    else:
        instance.quantity = 0
        instance.stock_in = 0


pre_save.connect(pre_save_receiver, sender=StockIn)
