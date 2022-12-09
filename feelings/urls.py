from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name = "index"),
    path("logoutpage", views.logoutpage, name="logoutpage"),
    path("loginpage", views.loginpage, name="loginpage")
]