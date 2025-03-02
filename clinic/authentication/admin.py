from django.contrib import admin

# Register your models here.
from .models import User, Group, Permission, Rule, Profile


class UserAdmin(admin.ModelAdmin):
    filter_horizontal = ('user_permissions', 'user_groups',)

    pass


class GroupAdmin(admin.ModelAdmin):
    filter_horizontal = ('group_permissions',)

    pass


class PermissionAdmin(admin.ModelAdmin):
    pass


class ProfileAdmin(admin.ModelAdmin):
    pass


class RuleAdmin(admin.ModelAdmin):
    pass


admin.site.register(Permission, PermissionAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Group, GroupAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Rule, RuleAdmin)
