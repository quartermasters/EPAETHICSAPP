# EPA Ethics App - Docker Commands

.PHONY: help build up down logs clean restart shell-backend shell-admin shell-mobile db-reset

help: ## Show this help message
	@echo "EPA Ethics App - Docker Commands"
	@echo "================================"
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z_-]+:.*?##/ { printf "  %-15s %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

build: ## Build all Docker images
	docker-compose build --no-cache

up: ## Start all services
	docker-compose up -d

up-dev: ## Start all services in development mode
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

down: ## Stop all services
	docker-compose down

logs: ## Show logs for all services
	docker-compose logs -f

logs-backend: ## Show backend logs
	docker-compose logs -f backend

logs-admin: ## Show admin portal logs
	docker-compose logs -f admin-portal

logs-mobile: ## Show mobile app logs
	docker-compose logs -f mobile

restart: ## Restart all services
	docker-compose restart

restart-backend: ## Restart backend service
	docker-compose restart backend

restart-admin: ## Restart admin portal
	docker-compose restart admin-portal

restart-mobile: ## Restart mobile app
	docker-compose restart mobile

shell-backend: ## Open shell in backend container
	docker-compose exec backend sh

shell-admin: ## Open shell in admin portal container
	docker-compose exec admin-portal sh

shell-mobile: ## Open shell in mobile container
	docker-compose exec mobile sh

db-shell: ## Connect to PostgreSQL database
	docker-compose exec postgres psql -U postgres -d epa_ethics

db-reset: ## Reset database (WARNING: This will delete all data)
	docker-compose down -v
	docker-compose up -d postgres
	sleep 5
	docker-compose up -d

clean: ## Remove all containers, images, and volumes
	docker-compose down -v --rmi all

status: ## Show status of all services
	docker-compose ps

install: ## Install dependencies in all containers
	docker-compose exec backend npm install
	docker-compose exec admin-portal npm install
	docker-compose exec mobile npm install

test: ## Run tests in backend
	docker-compose exec backend npm test

lint: ## Run linting in all containers
	docker-compose exec backend npm run lint
	docker-compose exec admin-portal npm run lint
	docker-compose exec mobile npm run lint