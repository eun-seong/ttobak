from django.urls import path
from .views import MakeUser,LogIn

urlpatterns = [
    path('',MakeUser.as_view()),
    path('sign_up',MakeUser.as_view()),
    path('sign_in',LogIn.as_view()),
]