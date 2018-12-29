from django.db import models

from django.contrib.auth.models import User


class Vendors(models.Model):
    agent_name    = models.OneToOneField(User, on_delete=models.CASCADE, related_name="agent_names")
    address       = models.TextField()
    phone_number  = models.CharField(max_length = 14)
    email_address = models.EmailField(unique=True)
    company_name  = models.CharField(max_length = 70)
    nid_card      = models.IntegerField(unique=True)
    profile_pic   = models.URLField(max_length = 70)
    create_date   = models.DateField(auto_now_add=True, blank=True, null=True)

    def __str__(self):
        return self.company_name