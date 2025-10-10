from django.urls import path
from .views import OrderListCreateView

app_name = 'orders'

urlpatterns = [
    path('', OrderListCreateView.as_view(), name='order-list-create'),
]
