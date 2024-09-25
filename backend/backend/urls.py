"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from api import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', views.user, name='user'),
    path('api/user/<int:id>/', views.user_by_id, name='user_by_id'),
    path('api/org/', views.org, name='user'),
    path('api/org/<int:id>/', views.org_by_id, name='org_by_id'),
    path('api/ticket/', views.ticket, name='ticket'),
    path('api/ticket/<int:id>/', views.ticket_by_id, name='ticket_by_id'),
    path('api/ticket_info/', views.ticket_info, name='ticket_info'),
    path('api/ticket_info/<int:id>/', views.ticket_info_by_id, name='ticket_info_by_id')
]
