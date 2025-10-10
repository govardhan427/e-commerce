import uuid
from django.db import models
from django.contrib.auth.models import User
from apps.products.models import Product

class Order(models.Model):
    class OrderStatus(models.TextChoices):
        PENDING = 'P', 'Pending'
        PROCESSING = 'PR', 'Processing'
        SHIPPED = 'S', 'Shipped'
        DELIVERED = 'D', 'Delivered'
        CANCELLED = 'C', 'Cancelled'

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='orders')
    full_name = models.CharField(max_length=150)
    email = models.EmailField(max_length=254)
    address = models.CharField(max_length=250)
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    total_paid = models.DecimalField(max_digits=10, decimal_places=2)
    order_key = models.UUIDField(default=uuid.uuid4, unique=True, editable=False, db_index=True)
    status = models.CharField(max_length=2, choices=OrderStatus.choices, default=OrderStatus.PENDING)

    class Meta:
        ordering = ('-created_at',)
        verbose_name = 'Order'
        verbose_name_plural = 'Orders'

    def __str__(self):
        return f"Order {self.order_key} by {self.user.username if self.user else 'Guest'}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name='order_items', on_delete=models.SET_NULL, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, help_text="Price at the time of purchase")
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        verbose_name = 'Order Item'
        verbose_name_plural = 'Order Items'

    def __str__(self):
        return str(self.id)
