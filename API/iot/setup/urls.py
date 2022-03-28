from django.contrib import admin
from django.urls import path, include
from iot.views import DeviceSwitchView
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'devices', DeviceSwitchView, 'device')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls))
]
