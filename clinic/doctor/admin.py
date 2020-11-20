from django.contrib import admin

# Register your models here.
from .models import Sick, Appointment, PatientVisit, Payment, PrescriptionItems


class SickAdmin(admin.ModelAdmin):
    pass


class AppointmentAdmin(admin.ModelAdmin):
    pass


class PatientVisitAdmin(admin.ModelAdmin):
    pass


class PaymentAdmin(admin.ModelAdmin):
    pass


class PrescriptionItemsAdmin(admin.ModelAdmin):
    pass


admin.site.register(Sick, SickAdmin)
admin.site.register(Appointment, AppointmentAdmin)
admin.site.register(PatientVisit, PatientVisitAdmin)
admin.site.register(Payment, PaymentAdmin)
admin.site.register(PrescriptionItems, PrescriptionItemsAdmin)
