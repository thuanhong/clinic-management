from django.contrib import admin

# Register your models here.
from .models import StoreDrug, UnitDrug, GuideDrug


class StoreDrugAdmin(admin.ModelAdmin):
    pass


class UnitDrugAdmin(admin.ModelAdmin):
    pass


class GuideDrugAdmin(admin.ModelAdmin):
    pass


admin.site.register(StoreDrug, StoreDrugAdmin)
admin.site.register(UnitDrug, UnitDrugAdmin)
admin.site.register(GuideDrug, GuideDrugAdmin)
