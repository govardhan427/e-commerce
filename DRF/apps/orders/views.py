from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db import transaction
from django.shortcuts import get_object_or_404

from .models import Order, OrderItem
from .serializers import OrderSerializer
from apps.products.models import Product

class OrderListCreateView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).prefetch_related('items__product')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        items_data = serializer.validated_data['items']
        total_paid = 0
        try:
            with transaction.atomic():
                for item_data in items_data:
                    product = get_object_or_404(Product, id=item_data['product_id'])
                    if product.stock < item_data['quantity']:
                        return Response(
                            {'error': f"Not enough stock for {product.name}. Only {product.stock} available."},
                            status=status.HTTP_400_BAD_REQUEST
                        )
                    total_paid += product.price * item_data['quantity']
                serializer.validated_data['total_paid'] = total_paid
                self.perform_create(serializer)
                order = serializer.instance
                for item in order.items.all():
                    product = item.product
                    product.stock -= item.quantity
                    product.save()

                headers = self.get_success_headers(serializer.data)
                return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
