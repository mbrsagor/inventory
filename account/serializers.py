from rest_framework import serializers
from .models import Category, Product, Payment, Sell


class CategorySerializer(serializers.ModelSerializer):
   
    class Meta:
        model  = Category
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
  
    class Meta:
        model  = Product
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['category_name'] = CategorySerializer(instance.category_name).data
        return response



class PaymentSerializer(serializers.ModelSerializer):

    class Meta:
        model  = Payment
        fields = '__all__'


class SellSerializer(serializers.ModelSerializer):

    class Meta:
        model  = Sell
        fields = ('__all__')

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['products'] = ProductSerializer(instance.products).data
        response['payment_type'] = PaymentSerializer(instance.payment_type).data
        return response