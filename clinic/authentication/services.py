from .models import User, Group, Permission


class UserService():
    @staticmethod
    def is_email_exists(email):
        return User.objects.filter(email=email).exists()

    @staticmethod
    def set_groups(user, group_ids):
        '''
        Set groups for a user by group IDs
        '''
        group_objects = Group.objects.filter(id__in=group_ids)
        user.user_groups.set(group_objects)

    @staticmethod
    def set_permissions(user, perm_ids):
        '''
        Set permissions for a user by permission IDs
        '''
        permissions = Permission.objects.filter(id__in=perm_ids)
        user.user_permissions.set(permissions)

    @staticmethod
    def create_new_user(data):
        groups = data.pop('groups', None)
        permissions = data.pop('permissions', None)

        user = User.objects.create_user(**data)
        if groups:
            UserService.set_groups(user, set(groups))

        if permissions:
            UserService.set_permissions(user, set(permissions))
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

        if groups:
            UserService.set_groups(user, set(groups))

        if permissions:
            UserService.set_permissions(user, set(permissions))
        user.save()
        return user
