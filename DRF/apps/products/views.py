from rest_framework import generics, filters, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import get_object_or_404

from .models import Product, Category, Review
from .serializers import (
    ProductSerializer,
    ProductDetailSerializer,
    CategorySerializer,
    CategoryDetailSerializer,
    ReviewSerializer
)

class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all().select_related('category').prefetch_related('reviews')
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = {
        'category__slug': ['exact'],
    }
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'created_at']
    ordering = ['-created_at']


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all().select_related('category').prefetch_related('reviews__user')
    serializer_class = ProductDetailSerializer
    lookup_field = 'pk'

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CategoryDetailView(generics.RetrieveAPIView):
    queryset = Category.objects.all().prefetch_related('products')
    serializer_class = CategoryDetailSerializer
    lookup_field = 'slug'



class ReviewListCreateView(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        product_id = self.kwargs.get('product_pk')
        return Review.objects.filter(product_id=product_id)

    def perform_create(self, serializer):
        product = get_object_or_404(Product, pk=self.kwargs.get('product_pk'))
        if Review.objects.filter(product=product, user=self.request.user).exists():
            raise serializers.ValidationError({'detail': 'You have already reviewed this product.'})
        serializer.save(user=self.request.user, product=product)