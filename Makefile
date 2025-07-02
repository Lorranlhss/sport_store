.PHONY: help install build start stop clean test

help:
	@echo "Available commands:"
	@echo "  make install  - Install all dependencies"
	@echo "  make build    - Build all containers"
	@echo "  make start    - Start all services"
	@echo "  make stop     - Stop all services"
	@echo "  make clean    - Clean all data"
	@echo "  make test     - Run all tests"

install:
	cd backend && mvn clean install
	cd frontend && npm install

build:
	docker-compose build

start:
	docker-compose up -d

stop:
	docker-compose down

clean:
	docker-compose down -v
	rm -rf backend/target
	rm -rf frontend/node_modules

test:
	cd backend && mvn test
	cd frontend && npm test
