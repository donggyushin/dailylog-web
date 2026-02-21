.PHONY: help install dev build typecheck lint preview clean docker-build docker-up docker-down docker-logs docker-clean

# Default target
help:
	@echo "Available commands:"
	@echo "  make install       - Install dependencies"
	@echo "  make dev           - Start development server"
	@echo "  make build         - Build for production"
	@echo "  make typecheck     - Run TypeScript type checking"
	@echo "  make lint          - Run ESLint"
	@echo "  make preview       - Preview production build"
	@echo "  make clean         - Clean build artifacts"
	@echo ""
	@echo "Docker commands:"
	@echo "  make docker-build  - Build Docker image"
	@echo "  make docker-up     - Start Docker container"
	@echo "  make docker-down   - Stop Docker container"
	@echo "  make docker-logs   - Show Docker container logs"
	@echo "  make docker-clean  - Remove Docker image and container"

# NPM commands
install:
	npm install

dev:
	npm run dev

build:
	npm run build

typecheck:
	npm run typecheck

lint:
	npm run lint

preview:
	npm run preview

clean:
	rm -rf dist node_modules/.tmp

# Docker commands
docker-build:
	docker compose build

docker-up:
	docker compose up -d
	@echo "Application is running at http://localhost:8080"

docker-down:
	docker compose down

docker-logs:
	docker compose logs -f

docker-clean:
	docker compose down -v --rmi all
	docker system prune -f
