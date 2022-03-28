from rest_framework import viewsets, generics, status
from rest_framework.generics import GenericAPIView, RetrieveUpdateAPIView
from rest_framework.response import Response
from rest_framework.mixins import ListModelMixin
from iot.models import DeviceSwitch
from iot.serializer import DeviceSwitchSerializer

# class DeviceSwitchViewSet(viewsets.ModelViewSet):
#     queryset = DeviceSwitch.objects.all()
#     serializer_class = DeviceSwitchSerializer

class DeviceSwitchAPI(ListModelMixin, GenericAPIView):
    queryset = DeviceSwitch.objects.all()
    serializer_class = DeviceSwitchSerializer

    def get(self, request, *args, **kwargs):
        
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        
        return self.create(request, *args, **kwargs)

class SingleDeviceSwitchAPI(RetrieveUpdateAPIView):
    queryset = DeviceSwitch.objects.all()
    serializer_class = DeviceSwitchSerializer

class DeviceSwitchView(viewsets.ModelViewSet):
    queryset = DeviceSwitch.objects.all()
    serializer_class = DeviceSwitchSerializer
