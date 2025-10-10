from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from .serializers import UserSerializer, UserDetailSerializer

class RegisterView(generics.CreateAPIView):
    """
    API view for user registration.
    Allows any user (authenticated or not) to create a new user account.
    """
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

class UserDetailView(generics.RetrieveAPIView):
    """
    API view to retrieve details of the currently authenticated user.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = UserDetailSerializer

    def get_object(self):
        """
        Overrides the default get_object method to return the
        user associated with the current request.
        """
        return self.request.user