# Quickstart

## Build docker file

```
docker build -t clinic .
```

## Run docker-compose

```
docker-compose -p clinic up
```

## Attch docker

```
docker exec -it [clinic-container-id] bash
pipenv shell
```

## Migrate

```
python manage.py makemigrations
python mangae.py migrate
```

## api

```
/api/v1/users/
/api/v1/permissons/
/api/v1/groups/
/api/v1/doctor/
/api/v1/patient/
/api/v1/patient-visit/
/api/v1/diagnostician/
/api/v1/store-drug/
/api/v1/appointment/
/api/v1/sick


/auth/login/
/auth/token/
/auth/change-password/
/health
/health/test-auth-request

```

## GROUP id for permissions

```
id =1 => admin

id =2 => doctor # /api/v1/doctor/
id =3 => patient # /api/v1/patient/
```

## CHANGE PASSWORD

```
PATCH
/auth/change-password/
{
    "old_password": "vDEcKG5PrT",
    "new_password": "sss"
}

response
{
    "status": "success",
    "code": 200,
    "message": "Password updated successfully",
    "data": []
}
```

## Run celery tasks

```
celery -A clinic.tasks worker -l info -n clinic

```
