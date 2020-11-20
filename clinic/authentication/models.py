import os
import uuid

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.conf import settings
from django.contrib.postgres.fields import JSONField


class Permission(models.Model):
    '''
    Class implementing Permission
    '''

    action = models.CharField(max_length=255, verbose_name='action')
    resource = models.CharField(max_length=255, verbose_name='resource')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = (('action', 'resource'),)

    def __str__(self):
        return 'Can {} {}'.format(self.action, self.resource)


class Group(models.Model):
    '''
    Class implementing Group
    '''
    name = models.CharField(max_length=255, verbose_name='name', unique=True)
    group_permissions = models.ManyToManyField(
        Permission, verbose_name='permissions', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'group'
        verbose_name_plural = 'groups'

    def __str__(self):
        return self.name

    def natural_key(self):
        return (self.name,)

    @property
    def users(self):
        result = []
        for user in self.group_users.all():
            result.append({
                'id': user.id,
                'name': user.name
            })
        return result

    @property
    def permissions(self):
        result = []
        for permissions in self.group_permissions.all():
            result.append({
                'id': permissions.id,
                'action': permissions.action,
                'resource': permissions.resource,
            })
        return result


class User(AbstractUser):
    '''User Model class'''

    name = models.CharField(max_length=512,
                            db_index=True,
                            null=True,
                            blank=True)
    email = models.CharField(max_length=512, blank=True, unique=True)
    oauth_id = models.CharField(max_length=256, blank=True, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    image = models.CharField(max_length=255, blank=True)

    # Timestamp Audit Fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    user_groups = models.ManyToManyField(
        Group,
        verbose_name='groups',
        blank=True,
        related_name="group_users",
        related_query_name="user",
    )

    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name='user permissions',
        blank=True,
        related_name="user_set",
        related_query_name="user",
    )

    EMAIL_FIELD = 'email'

    def save(self, *args, **kwargs):
        self.oauth_id = uuid.uuid1()
        return super().save(*args, **kwargs)

    def can(self, action, resource):
        return self.user_permissions.filter(action=action, resource=resource).exists() or \
            self.user_groups.filter(group_permissions__action=action,
                                    group_permissions__resource=resource).exists()

    @property
    def permissions(self):
        result = []
        for permissions in self.user_permissions.all():
            result.append({
                'id': permissions.id,
                'action': permissions.action,
                'resource': permissions.resource,
            })
        return result

    @property
    def groups(self):
        user_groups = self.user_groups.all()

        results = []
        for group in user_groups:
            group_obj = {
                "id": group.id,
                "name": group.name,
            }

            results.append(group_obj)
        return results


class Profile(models.Model):
    '''
    Class implementing Profile User
    '''
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    age = models.IntegerField(blank=True)
    gender = models.CharField(max_length=255, blank=True)
    image = models.CharField(max_length=255, blank=True)
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    title = models.CharField(max_length=255, blank=True)

    class Meta:
        pass

    def __str__(self):
        return 'Name: {} {}'.format(self.first_name, self.last_name)


class Rule(models.Model):
    rule_name = models.CharField(max_length=255)
    rule_description = models.CharField(max_length=255, blank=True)
    rule_parameters = JSONField()
    active_screening = models.BooleanField(default=True)


def get_list_active_permissions(active_permissions):
    all_permissions = Permission.objects.all()
    list_resource = all_permissions.values(
        'resource').distinct()
    list_resource = [{"resource": x["resource"], "actions": []}
                     for x in list_resource]

    for permission in all_permissions:
        perm_obj = {
            "id": permission.id,
            "action": permission.action,
            "active": False
        }
        if permission.id in active_permissions:
            perm_obj["active"] = True

        for resource in list_resource:
            if resource["resource"] == permission.resource:
                resource["actions"].append(perm_obj)
                break

    return list_resource
