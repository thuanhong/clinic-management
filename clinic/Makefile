build:
	docker-compose -f docker-compose.dev.yml -p clinic --build
up:
	docker-compose -f docker-compose.dev.yml -p clinic up -d
reset:
	docker-compose -f docker-compose.dev.yml -p clinic down
	docker-compose -f docker-compose.dev.yml -p clinic up -d
run:
	docker exec -it clinic_web-backend_1 bash
stop:
	docker-compose -f docker-compose.dev.yml -p clinic stop