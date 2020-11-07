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
/api/users/
/auth/login/
/auth/token/
/health
/health/test-auth-request
```