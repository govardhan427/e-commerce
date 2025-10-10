from django.urls import path
from .views import RegisterView, UserDetailView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

app_name = 'users'

urlpatterns = [
    # Route for user registration
    path('register/', RegisterView.as_view(), name='register'),
    
    # Route for retrieving user details
    path('user/', UserDetailView.as_view(), name='user-detail'),

    # Routes for JWT token management (Login)
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]