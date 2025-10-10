from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator

User = settings.AUTH_USER_MODEL

class Category(models.Model):
    name = models.CharField(max_length=255, unique=True, help_text="The name of the category.")
    slug = models.SlugField(max_length=255, unique=True, help_text="A URL-friendly version of the category name.")
    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"
        ordering = ['name']

    def __str__(self):
        return self.name

class Product(models.Model):
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE, help_text="The category this product belongs to.")
    name = models.CharField(max_length=255, help_text="The name of the product.")
    description = models.TextField(blank=True, help_text="A detailed description of the product.")
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0.01)], help_text="The price of the product.")
    image_url = models.URLField(max_length=1024, null=True, blank=True, help_text="A URL to an image of the product.")
    stock = models.PositiveIntegerField(default=0, help_text="The number of items in stock.")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name

class Review(models.Model):
    product = models.ForeignKey(Product, related_name='reviews', on_delete=models.CASCADE, help_text="The product being reviewed.")
    user = models.ForeignKey(User, related_name='reviews', on_delete=models.CASCADE, help_text="The user who wrote the review.")
    rating = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        help_text="The star rating given by the user (1-5)."
    )
    comment = models.TextField(blank=True, help_text="The user's written comments.")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ('product', 'user')

    def __str__(self):
        return f"Review by {self.user.username} for {self.product.name}"
