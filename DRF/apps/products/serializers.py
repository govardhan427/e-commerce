from rest_framework import serializers
from .models import Category, Product, Review
from django.db.models import Avg

class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Review
        fields = ['id', 'user', 'rating', 'comment', 'created_at']


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    average_rating = serializers.SerializerMethodField()
    review_count = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'category', 'price', 'image_url', 'stock',
            'average_rating', 'review_count'
        ]

    def get_average_rating(self, obj):
        avg = obj.reviews.aggregate(Avg('rating'))['rating__avg']
        return round(avg, 2) if avg is not None else 0

    def get_review_count(self, obj):
        return obj.reviews.count()


class ProductDetailSerializer(ProductSerializer):
    category = serializers.PrimaryKeyRelatedField(read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    class Meta(ProductSerializer.Meta):
        fields = ProductSerializer.Meta.fields + ['description', 'reviews']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']


class CategoryDetailSerializer(CategorySerializer):
    products = ProductSerializer(many=True, read_only=True)
    class Meta(CategorySerializer.Meta):
        fields = CategorySerializer.Meta.fields + ['products']