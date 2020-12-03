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
SICK_ROUTER = (
    {
        'url': 'api/v1/sick$',
        'method': 'GET',
        'permission': {'action': 'read', 'resource': 'sick'}
    },
    {
        'url': 'api/v1/sick/(?P<pk>[^/.]+)$',
        'method': 'GET',
        'permission': {'action': 'read', 'resource': 'sick'}
    },
    {
        'url': 'api/v1/sick$',
        'method': 'PATCH',
        'permission': {'action': 'update', 'resource': 'sick'}
    },
    {
        'url': 'api/v1/sick/(?P<pk>[^/.]+)$',
        'method': 'PATCH',
        'permission': {'action': 'update', 'resource': 'sick'}
    },
    {
        'url': 'api/v1/sick$',
        'method': 'POST',
        'permission': {'action': 'create', 'resource': 'sick'}
    },
)
PATIENT_VISIT_ROUTER = (
    {
        'url': 'api/v1/patient-visit$',
        'method': 'GET',
        'permission': {'action': 'read', 'resource': 'patient-visit'}
    },
    {
        'url': 'api/v1/patient-visit/(?P<pk>[^/.]+)$',
        'method': 'GET',
        'permission': {'action': 'read', 'resource': 'patient-visit'}
    },
    {
        'url': 'api/v1/patient-visit$',
        'method': 'PATCH',
        'permission': {'action': 'update', 'resource': 'patient-visit'}
    },
    {
        'url': 'api/v1/patient-visit/(?P<pk>[^/.]+)$',
        'method': 'PATCH',
        'permission': {'action': 'update', 'resource': 'patient-visit'}
    },
    {
        'url': 'api/v1/patient-visit$',
        'method': 'POST',
        'permission': {'action': 'create', 'resource': 'patient-visit'}
    },
)

APPOINTMENT_ROUTER = (
    {
        'url': 'api/v1/appointment$',
        'method': 'GET',
        'permission': {'action': 'read', 'resource': 'appointment'}
    },
    {
        'url': 'api/v1/appointment/(?P<pk>[^/.]+)$',
        'method': 'GET',
        'permission': {'action': 'read', 'resource': 'appointment'}
    },
    {
        'url': 'api/v1/appointment$',
        'method': 'PATCH',
        'permission': {'action': 'update', 'resource': 'appointment'}
    },
    {
        'url': 'api/v1/appointment/(?P<pk>[^/.]+)$',
        'method': 'PATCH',
        'permission': {'action': 'update', 'resource': 'appointment'}
    },
    {
        'url': 'api/v1/appointment$',
        'method': 'POST',
        'permission': {'action': 'create', 'resource': 'appointment'}
    },
)

DIAGNOSTICIAN_ROUTER = (
    {
        'url': 'api/v1/diagnostician$',
        'method': 'GET',
        'permission': {'action': 'read', 'resource': 'diagnostician'}
    },
    {
        'url': 'api/v1/diagnostician/(?P<pk>[^/.]+)$',
        'method': 'GET',
        'permission': {'action': 'read', 'resource': 'diagnostician'}
    },
    {
        'url': 'api/v1/diagnostician$',
        'method': 'PATCH',
        'permission': {'action': 'update', 'resource': 'diagnostician'}
    },
    {
        'url': 'api/v1/diagnostician/(?P<pk>[^/.]+)$',
        'method': 'PATCH',
        'permission': {'action': 'update', 'resource': 'diagnostician'}
    },
    {
        'url': 'api/v1/diagnostician$',
        'method': 'POST',
        'permission': {'action': 'create', 'resource': 'diagnostician'}
    },
)
STORE_ITEM_ROUTER = (
    {
        'url': 'api/v1/store-item$',
        'method': 'GET',
        'permission': {'action': 'read', 'resource': 'store-item'}
    },
    {
        'url': 'api/v1/store-item/(?P<pk>[^/.]+)$',
        'method': 'GET',
        'permission': {'action': 'read', 'resource': 'store-item'}
    },
    {
        'url': 'api/v1/store-item$',
        'method': 'PATCH',
        'permission': {'action': 'update', 'resource': 'store-item'}
    },
    {
        'url': 'api/v1/store-item/(?P<pk>[^/.]+)$',
        'method': 'PATCH',
        'permission': {'action': 'update', 'resource': 'store-item'}
    },
    {
        'url': 'api/v1/store-item$',
        'method': 'POST',
        'permission': {'action': 'create', 'resource': 'store-item'}
    },
)
NURSE_ROUTER = (
    {
        'url': 'api/v1/nurse$',
        'method': 'GET',
        'permission': {'action': 'read', 'resource': 'nurse'}
    },
    {
        'url': 'api/v1/nurse/(?P<pk>[^/.]+)$',
        'method': 'GET',
        'permission': {'action': 'read', 'resource': 'nurse'}
    },
    {
        'url': 'api/v1/nurse$',
        'method': 'PATCH',
        'permission': {'action': 'update', 'resource': 'nurse'}
    },
    {
        'url': 'api/v1/nurse/(?P<pk>[^/.]+)$',
        'method': 'PATCH',
        'permission': {'action': 'update', 'resource': 'nurse'}
    },
    {
        'url': 'api/v1/nurse$',
        'method': 'POST',
        'permission': {'action': 'create', 'resource': 'nurse'}
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
) + USER_ROUTERS + GROUP_ROUTERS + DOCTOR_ROUTER + PERMISSION_ROUTER + STAFF_ROUTER + PATIENT_ROUTER\
+ SICK_ROUTER + APPOINTMENT_ROUTER + PATIENT_VISIT_ROUTER + STORE_ITEM_ROUTER + DIAGNOSTICIAN_ROUTER + NURSE_ROUTER
