docker-up:
	docker compose up -d

docker-down:
	docker compose down

migrate:
	db-migrate create initialize --sql-file

migrate-up:
	db-migrate up -v 

migrate-down:
	db-migrate down 

azurite:
	azurite --skipApiVersionCheck --location /azurite

start: 
	npm run start

.PHONY: docker_up docker_down migrate migrate-up migrate-down start


