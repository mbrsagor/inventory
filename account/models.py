from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length= 50, unique = True)
    date = models.DateField(auto_now_add = True)

    def __str__(self):
        return self.name


class Product(models.Model):
    product_name  = models.CharField(max_length= 150)
    category_name = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='category')
    price         = models.IntegerField(default=0)
    image         = models.URLField(max_length= 120)
    description   = models.TextField()
    brand_name    = models.CharField(max_length= 50)
    create_at     = models.DateField(auto_now_add = True)

    def __str__(self):
        return self.product_name



class Payment(models.Model):
    payment = models.CharField(max_length= 50, unique = True)
    date    = models.DateField(auto_now_add = True)

    def __str__(self):
        return self.payment


class Sell(models.Model):
    customer_name = models.CharField(max_length = 30, blank=True, null=True)
    address      = models.CharField(max_length = 50, blank=True, null=True)
    phone_number  = models.CharField(max_length = 15, blank=True, null=True)
    due          = models.IntegerField(blank=True, null=True)
    payment_date = models.DateField(blank=True, null=True)
    paid         = models.IntegerField(blank=True, null=True)
    products     = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='sell_products')
    payment_type = models.ForeignKey(Payment, on_delete=models.CASCADE, related_name='paymentType')
    quantity     = models.IntegerField()
    price        = models.IntegerField(default=0)
    date         = models.DateField(auto_now_add = True)

    def __str__(self):
        return self.customer_name
