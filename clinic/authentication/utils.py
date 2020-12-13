import datetime
import jwt
from django.conf import settings
from django.urls import path, reverse, resolve
from .configs import ROUTERS


def generate_access_token(user):

    access_token_payload = {
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, minutes=120),
        'iat': datetime.datetime.utcnow(),
    }
    access_token = jwt.encode(access_token_payload,
                              settings.SECRET_KEY, algorithm='HS256').decode('utf-8')
    return access_token


def generate_refresh_token(user):
    refresh_token_payload = {
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=2),
        'iat': datetime.datetime.utcnow()
    }
    refresh_token = jwt.encode(
        refresh_token_payload, settings.REFRESH_TOKEN_SECRET, algorithm='HS256').decode('utf-8')

    return refresh_token


def extract_permission_from_request(request):
    """
    Extract and return permission from HTTPRequest request
    """

    if request is None:
        return None

    route = resolve(request.path_info).route
    for router in ROUTERS:
        if router['url'] == route and router['method'] == request.method:
            return router['permission'] if 'permission' in router else None

    return None
