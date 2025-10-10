from rest_framework import serializers
from .models import Order, OrderItem
from apps.products.models import Product

class OrderItemSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField(write_only=True)
    product = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product_id', 'product', 'price', 'quantity']
        read_only_fields = ('price', 'product') # Price is set in the view, product is for display


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'order_key', 'user', 'items', 'total_paid', 'status',
            'full_name', 'email', 'address', 'city', 'postal_code', 'country',
            'created_at'
        ]
        read_only_fields = ('id', 'order_key', 'user', 'total_paid', 'status', 'created_at')

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        for item_data in items_data:
            product = Product.objects.get(id=item_data['product_id'])
            OrderItem.objects.create(
                order=order,
                product=product,
                price=product.price,
                quantity=item_data['quantity']
            )
        return order
