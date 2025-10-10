from django.contrib import admin
from .models import Order, OrderItem

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    raw_id_fields = ['product']
    extra = 0

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'order_key', 'full_name', 'status', 'total_paid', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['order_key', 'full_name', 'email']
    inlines = [OrderItemInline]

    fieldsets = (
        (None, {
            'fields': ('user', 'status', 'total_paid')
        }),
        ('Shipping Information', {
            'fields': ('full_name', 'email', 'address', 'city', 'postal_code', 'country')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at', 'order_key'),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ('created_at', 'updated_at', 'order_key', 'user', 'total_paid')

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'product', 'price', 'quantity')
    search_fields = ('order__order_key', 'product__name')
    list_filter = ('order__status',)
