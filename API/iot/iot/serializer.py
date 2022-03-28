from rest_framework import serializers
from iot.models import DeviceSwitch

class DeviceSwitchSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeviceSwitch
        fields = '__all__'