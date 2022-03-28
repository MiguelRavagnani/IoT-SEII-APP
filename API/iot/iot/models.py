from django.db import models

class DeviceSwitch(models.Model):
    nome = models.CharField(max_length=120)
    description = models.TextField(max_length=500, default='...')
    status = models.BooleanField(default=False)

    def __str__(self):
        return self.nome