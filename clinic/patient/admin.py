from django.contrib import admin

# Register your models here.
from .models import Patient


class PatientAdmin(admin.ModelAdmin):
    pass


admin.site.register(Patient, PatientAdmin)
