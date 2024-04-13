## run the tests. Usage `make test testcase=TestName` to run an isolated test or `make test` to run all tests
.PHONY: test
test:
	if [ -n "$(testcase)" ]; then \
		npx jest -t=$(testcase); \
	else \
		npx jest; \
	fi

## run lint
.PHONY: lint
lint:
	npx eslint . --fix

## Install dependencies
.PHONY: install
install:
	npm install

## Run the app
.PHONY: run
run:
	npm run dev

## npm build
.PHONY: build
build:
	npm run build

## Clean containers, images and volumes
.PHONY: dev/clean
dev/clean:
	@echo "Cleaning containers, images and volumes..."
	@docker-compose down --rmi all --volumes --remove-orphans

## Start containers, additionaly you can provide rebuild=true to force rebuild
.PHONY: dev/start
dev/start:
	@echo "Starting development server..."
	@if [ "$(rebuild)" = "true" ]; then \
		docker-compose up -d --build; \
	else \
		docker-compose up -d; \
	fi

## Stop containers
.PHONY: dev/stop
dev/stop:
	@echo "Stopping development server..."
	@docker-compose down

## Restart containers, if container=<name> is provided only it will be restarted
.PHONY: dev/restart
dev/restart: container=
dev/restart:
	@echo "Restarting development server..."
	@docker-compose restart $(container)

## Prisma studio
.PHONY: prisma/studio
prisma/studio:
	@echo "Starting Prisma Studio..."
	@npx prisma studio

## Run prisma migrate dev. Not recommended for production
.PHONY: prisma/migrate/dev
prisma/migrate/dev:
	@echo "Running Prisma Migrate Dev..."
	@npx prisma migrate dev

## Display help for all targets
.PHONY: help
help:
	@awk '/^.PHONY: / { \
		msg = match(lastLine, /^## /); \
			if (msg) { \
				cmd = substr($$0, 9, 100); \
				msg = substr(lastLine, 4, 1000); \
				printf "  ${GREEN}%-30s${RESET} %s\n", cmd, msg; \
			} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST)
