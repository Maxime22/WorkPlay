.DEFAULT_GOAL: help

help:
	@awk 'BEGIN {FS = ":.* ##"; printf "\n\033[1mUsage:\033[0m\n  make \033[32m<target>\033[0m\n"} /^[a-zA-Z_-.]+:.* ## / { printf "  \033[33m%-25s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

## Cette ligne permet de marquer toutes les targets PHONY, sauf node_modules
.PHONY: $(filter-out node_modules build, $(shell awk -F: '/^[a-zA-Z0-9_%-]+:/ { print $$1 }' $(MAKEFILE_LIST) | sort | uniq))

##@ Install/Update the application

install: ## Install dependencies
	npm install

##@ Start the application

start: ## Start the application, do it in its own terminal
	npm start

android: ## Open in android emulator, do it in another terminal
	npm run android
