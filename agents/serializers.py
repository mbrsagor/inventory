from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Vendors
from django.db.models import Q
from rest_framework.serializers import CharField


# User registeration serializer
class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model  = User
        fields = [
            'id',
            'username',
            'email',
            'password'
        ]
        extra_kwargs = {'password':
            {'write_only': True}
        }
    
    def create(self, validated_data):
        username = validated_data['username']
        email    = validated_data['email']
        password = validated_data['password']

        user_obj = User(
            username = username,
            email    = email
        )
        user_obj.set_password(password)
        user_obj.save()
        return validated_data


# Vendor/Agent
class VendorSerializers(serializers.ModelSerializer):
    class Meta:
        model  = Vendors
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['agent_name'] = UserCreateSerializer(instance.agent_name).data
        return response