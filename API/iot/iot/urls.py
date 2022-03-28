from django.urls import path

from iot.views import DeviceSwitchAPI, SingleDeviceSwitchAPI


urlpatterns = [
    path('devices/', DeviceSwitchAPI.as_view(), name='devices'),
    path('devices/<int:pk>', SingleDeviceSwitchAPI.as_view(), name='devices')
]