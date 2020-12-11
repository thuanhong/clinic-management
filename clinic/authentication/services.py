from .models import User, Group, Permission, Profile


class AuthenticationService():

    @staticmethod
    def is_email_exists(email):
        return Profile.objects.filter(email=email.strip()).exists()

    @staticmethod
    def is_group_name_exists(name):
        return Group.objects.filter(name=name.strip()).exists()

    @staticmethod
    def set_groups(user, group_ids):
        '''
        Set groups for a user by group IDs
        '''
        group_objects = Group.objects.filter(id__in=group_ids)
        if group_objects.count() == len(group_ids):
            user.user_groups.set(group_objects)

    @staticmethod
    def set_user_permissions(user, perm_ids):
        '''
        Set permissions for a user by permission IDs
        '''
        permissions = Permission.objects.filter(id__in=perm_ids)
        if permissions.count() == len(perm_ids):
            user.user_permissions.set(permissions)

    @staticmethod
    def set_group_permissions(group, perm_ids):
        '''
        Set permissions for a user by permission IDs
        '''
        permissions = Permission.objects.filter(id__in=perm_ids)
        if permissions.count() == len(perm_ids):
            group.group_permissions.set(permissions)

    @staticmethod
    def set_users(group, user_ids):
        '''
        Set users for a group by user IDs
        '''
        users = User.objects.filter(id__in=user_ids)
        if users.count() == len(user_ids):
            group.group_users.set(users)

    @staticmethod
    def create_new_user(data):
        groups = data.pop('groups', None)
        permissions = data.pop('permissions', None)

        user = User.objects.create_user(**data)
        if groups is not None:
            AuthenticationService.set_groups(user, set(groups))

        if permissions is not None:
            AuthenticationService.set_user_permissions(user, set(permissions))
        user.save()
        return user

    @staticmethod
    def update_user(user, data):
        groups = data.pop('groups', None)
        permissions = data.pop('permissions', None)
        email = data.pop('email', None)

        if email:
            # Don't update email
            pass

        if 'name' in data:
            user.name = data['name']

        if groups is not None:
            AuthenticationService.set_groups(user, set(groups))

        if permissions is not None:
            AuthenticationService.set_user_permissions(user, set(permissions))
        user.save()
        return user

    @staticmethod
    def create_new_group(data):
        users = data.pop('users', None)
        permissions = data.pop('permissions', None)

        group = Group.objects.create(**data)

        if users is not None:
            AuthenticationService.set_users(group, set(users))

        if permissions is not None:
            AuthenticationService.set_group_permissions(
                group, set(permissions))

        group.save()
        return group

    @staticmethod
    def update_group(group, data):
        users = data.pop('users', None)
        permissions = data.pop('permissions', None)

        if 'name' in data:
            group.name = data['name']

        if users is not None:
            AuthenticationService.set_users(group, set(users))

        if permissions is not None:
            AuthenticationService.set_group_permissions(
                group, set(permissions))

        group.save()
        return group

    @staticmethod
    def find_invalid_group_ids(value):
        found_ids = Group.objects.filter(
            id__in=value).values_list('id', flat=True)
        return list(set(value).difference(set(found_ids)))

    @staticmethod
    def find_invalid_user_ids(value):
        found_ids = User.objects.filter(
            id__in=value).values_list('id', flat=True)
        return list(set(value).difference(set(found_ids)))

    @staticmethod
    def find_invalid_permission_ids(value):
        found_ids = Permission.objects.filter(
            id__in=value).values_list('id', flat=True)
        return list(set(value).difference(set(found_ids)))
