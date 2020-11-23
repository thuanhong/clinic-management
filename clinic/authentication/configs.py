USER_ROUTERS = (
    {
        'url': 'api/v1/users$',
        'method': 'GET',
        'permission': {'action': 'read', 'resource': 'user'}
    },
    {
        'url': 'api/v1/users/(?P<pk>[^/.]+)$',
        'method': 'GET',
        'permission': {'action': 'read', 'resource': 'user'}
    },
    {
        'url': 'api/v1/users$',
        'method': 'PATCH',
        'permission': {'action': 'update', 'resource': 'user'}
    },
    {
        'url': 'api/v1/users/(?P<pk>[^/.]+)$',
        'method': 'PATCH',
        'permission': {'action': 'update', 'resource': 'user'}
    },
    {
        'url': 'api/v1/users$',
        'method': 'POST',
        'permission': {'action': 'create', 'resource': 'user'}
    },

)

GROUP_ROUTERS = (
    {
        'url': 'api/v1/groups',
        'method': 'GET',
        'permission': {'action': 'read', 'resource': 'group'}
    },
    {
        'url': 'api/v1/groups/(?P<pk>[^/.]+)$',
        'method': 'GET',
        'permission': {'action': 'update', 'resource': 'group'}
    },
    {
        'url': 'api/v1/groups$',
        'method': 'PATCH',
        'permission': {'action': 'read', 'resource': 'group'}
    },
    {
        'url': 'api/v1/groups/(?P<pk>[^/.]+)$',
        'method': 'PATCH',
        'permission': {'action': 'update', 'resource': 'group'}
    },
    {
        'url': 'api/v1/groups$',
        'method': 'POST',
        'permission': {'action': 'create', 'resource': 'group'}
    },
    {
        'url': 'api/v1/groups/(?P<pk>[^/.]+)$',
        'method': 'DELETE',
        'permission': {'action': 'delete', 'resource': 'group'}
    },
)
PERMISSION_ROUTER = (
    {
        'url': 'api/v1/permissions$',
        'method': 'GET',
        'permission': {'action': 'read', 'resource': 'permission'}
    },
    {
        'url': 'api/v1/permission$',
        'method': 'POST',
        'permission': {'action': 'create', 'resource': 'permission'}
    },
)

DOCTOR_ROUTER = (
    {
        'url': 'auth/login-doctor/',
        'method': 'POST',
        'permission': {'action': 'access', 'resource': 'doctor'}
    },
    {
        'url': 'api/v1/doctor$',
        'method': 'GET',
        'permission': {'action': 'read', 'resource': 'doctor'}
    },
    {
        'url': 'api/v1/doctor/(?P<pk>[^/.]+)$',
        'method': 'GET',
        'permission': {'action': 'read', 'resource': 'doctor'}
    },
    {
        'url': 'api/v1/doctor$',
        'method': 'PATCH',
        'permission': {'action': 'update', 'resource': 'doctor'}
    },
    {
        'url': 'api/v1/doctor/(?P<pk>[^/.]+)$',
        'method': 'PATCH',
        'permission': {'action': 'update', 'resource': 'doctor'}
    },
    {
        'url': 'api/v1/doctor$',
        'method': 'POST',
        'permission': {'action': 'create', 'resource': 'doctor'}
    },
)
PATIENT_ROUTER = (
    {
        'url': 'api/v1/patient$',
        'method': 'GET',
        'permission': {'action': 'read', 'resource': 'patient'}
    },
    {
        'url': 'api/v1/patient/(?P<pk>[^/.]+)$',
        'method': 'GET',
        'permission': {'action': 'read', 'resource': 'patient'}
    },
    {
        'url': 'api/v1/patient$',
        'method': 'PATCH',
        'permission': {'action': 'update', 'resource': 'patient'}
    },
    {
        'url': 'api/v1/patient/(?P<pk>[^/.]+)$',
        'method': 'PATCH',
        'permission': {'action': 'update', 'resource': 'patient'}
    },
    {
        'url': 'api/v1/patient$',
        'method': 'POST',
        'permission': {'action': 'create', 'resource': 'patient'}
    },
)
STAFF_ROUTER = (
    {
        'url': 'auth/login-staff/',
        'method': 'POST',
        'permission': {'action': 'access', 'resource': 'staff'}
    },
)
ROUTERS = (
    {
        'url': 'health/test-auth-request',
        'method': 'GET',
        'permission': {'action': 'access', 'resource': 'resource'}
    },
) + USER_ROUTERS + GROUP_ROUTERS + DOCTOR_ROUTER + PERMISSION_ROUTER + STAFF_ROUTER + PATIENT_ROUTER
