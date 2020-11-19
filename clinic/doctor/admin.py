from django.contrib import admin

# Register your models here.
from .models import Sick

class SickAdmin(admin.ModelAdmin):
    pass
admin.site.register(Sick,SickAdmin)