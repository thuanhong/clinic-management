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
/health
/health/test-auth-request

```

## GROUP id for permissions

```
id =1 => admin

id =2 => doctor # /api/v1/doctor/
id =3 => patient # /api/v1/patient/
```
