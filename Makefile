current_dir = $(shell pwd)

dev:
	npm run dev

production:
	npm start

postgresdb:
	docker run -d --hostname postgresdb -p 5432:5432 -e POSTGRES_USER=sales_cashback -e POSTGRES_PASSWORD=s4l3s -v pg_data:/var/lib/postgresql/data postgres:12.2