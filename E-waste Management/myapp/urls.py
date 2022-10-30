from django.contrib import admin
from django.urls import path
from myapp import views

urlpatterns = [
    path("", views.index, name='myapp'),
    path("about", views.about, name='about'),
    path("services", views.services, name='services'),
    path("signin",views.signin, name='signin'),
    path("signup",views.signup, name='signup'),
    path("dform", views.dform, name='dform'),
    path("profile", views.profile, name='profile'),
    path("dashboard", views.dashboard, name='dashboard'),
    path("post",views.post,name='post'),
    path("dashboard4", views.dashboard4, name='dashboard4'),
    path("guidelines",views.guidelines,name='guidelines'),
    path("notifications",views.notifications,name='notifications'),
    path("login2",views.login2,name='login2'),
    path("order_details",views.order_details,name='order_details'),
    path("dashboard2",views.dashboard2,name='dashboard2'),
    path("dashboard3",views.dashboard3,name='dashboard3'),
    path("notifications2",views.notifications2,name='notifications2')
]