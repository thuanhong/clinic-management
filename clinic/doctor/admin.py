from django.contrib import admin

# Register your models here.
from .models import Sick, Diagnosise, Prescription

class PrescriptionAdmin(admin.ModelAdmin):

    pass

class DiagnosiseAdmin(admin.ModelAdmin):

    pass

class SickAdmin(admin.ModelAdmin):
    pass
admin.site.register(Prescription, PrescriptionAdmin)
admin.site.register(Diagnosise, DiagnosiseAdmin)
admin.site.register(Sick,SickAdmin)