import os
import uuid
# import boto3

# from botocore.exceptions import ClientError, ParamValidationError
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.conf import settings

# USER_POOL_ID = settings.USER_POOL_ID_DEFAULT
# client = boto3.client('cognito-idp',
#                       region_name=settings.USER_POOL_REGION_ID,
#                       aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
#                       aws_access_key_id=settings.AWS_ACCESS_KEY_ID)


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
        group_permission_ids = self.group_permissions.values_list(
            'id', flat=True).filter()

        return get_list_active_permissions(group_permission_ids)


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
        """
        Overrode to enforce that an AWS Cognito user is created and the oauth ID is stored.
        As well as set email as user unique username
        """
        is_update_event = bool(self.oauth_id)
        # is_unit_testing = settings.ENV == "test"
        is_unit_testing =True
        if not is_update_event:
            if is_unit_testing:
                self.oauth_id = uuid.uuid1()
            else:
                self._resolve_with_cognito()

        # On update, update attributes on Cognito to ensure consistency
        if is_update_event and not is_unit_testing:
            self._update_name_on_cognito(
                USER_POOL_ID, self.oauth_id, self.name)
        return super().save(*args, **kwargs)


    def can(self, action, resource):
        return self.user_permissions.filter(action=action, resource=resource).exists() or \
            self.user_groups.filter(group_permissions__action=action,
                                    group_permissions__resource=resource).exists()

    @property
    def permissions(self):
        user_permission_ids = self.user_permissions.values_list(
            'id', flat=True).filter()

        return get_list_active_permissions(user_permission_ids)

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
