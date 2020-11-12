USER_ROUTERS = (
    {
        'url': 'api/users$',
        'method': 'GET',
        'permission': {'action': 'read', 'resource': 'user'}
    },
    {
        'url': 'api/users/(?P<pk>[^/.]+)$',
        'method': 'GET',
        'permission': {'action': 'read', 'resource': 'user'}
    },
    {
        'url': 'api/users$',
        'method': 'PATCH',
        'permission': {'action': 'update', 'resource': 'user'}
    },
    {
        'url': 'api/users/(?P<pk>[^/.]+)$',
        'method': 'PATCH',
        'permission': {'action': 'update', 'resource': 'user'}
    },
    {
        'url': 'api/users$',
        'method': 'POST',
        'permission': {'action': 'create', 'resource': 'user'}
    },
)

GROUP_ROUTERS = (
    {
        'url': 'api/groups$',
        'method': 'GET',
        'permission': {'action': 'read', 'resource': 'group'}
    },
    {
        'url': 'api/groups/(?P<pk>[^/.]+)$',
        'method': 'GET',
        'permission': {'action': 'update', 'resource': 'group'}
    },
    {
        'url': 'api/groups$',
        'method': 'PATCH',
        'permission': {'action': 'read', 'resource': 'group'}
    },
    {
        'url': 'api/groups/(?P<pk>[^/.]+)$',
        'method': 'PATCH',
        'permission': {'action': 'update', 'resource': 'group'}
    },
    {
        'url': 'api/groups$',
        'method': 'POST',
        'permission': {'action': 'create', 'resource': 'group'}
    },
    {
        'url': 'api/groups/(?P<pk>[^/.]+)$',
        'method': 'DELETE',
        'permission': {'action': 'delete', 'resource': 'group'}
    },
)

DOCTOR_ROUTER =(
    {
        'url': 'api/login-doctor$',
        'method': 'GET',
        'permission': {'action': 'read', 'resource': 'doctor'}
    },
)

ROUTERS = (
    {
        'url': 'health/test-auth-request',
        'method': 'GET',
        # 'permission': {'action': 'dumb_action', 'resource': 'dumb_resource'}
    },
) + USER_ROUTERS + DOCTOR_ROUTER
