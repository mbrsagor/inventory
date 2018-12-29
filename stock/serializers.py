from rest_framework import serializers
from .models import StockIn
from account.models import Product, Category, Payment
from agents.models import Vendors



class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Product
        fields = [
            'product_name'
        ]

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model  = Category
        fields = [
            'name'
        ]


class AgentSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Vendors
        fields = [
            'company_name'
        ]

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Payment
        fields = [
            'payment'
        ]



class StockinSerializers(serializers.ModelSerializer):
    
    class Meta:
        model  = StockIn
        fields = ('__all__')

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['product'] = ProductSerializer(instance.product).data
        response['category'] = CategorySerializer(instance.category).data
        response['agent'] = AgentSerializer(instance.agent).data
        response['pay_status'] = PaymentSerializer(instance.pay_status).data
        return response