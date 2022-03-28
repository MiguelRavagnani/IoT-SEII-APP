from django.contrib import admin
from iot.models import DeviceSwitch

@admin.register(DeviceSwitch)
class DeviceSwitch(admin.ModelAdmin):
    list_display = ('id', 'nome', 'status', 'description')
    list_display_links = ('id', 'nome', 'status', 'description')
    search_fields = ('id', 'nome', 'status', 'description')
    list_per_page = 20
