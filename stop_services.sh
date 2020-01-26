#!/bin/bash

cd modules/typescript-express-module-example
docker-compose -f docker-compose.dev.yml down

cd ../..
cd modules/google-search-results-module
docker-compose -f docker-compose.dev.yml down

cd ../..
cd ui
docker-compose -f docker-compose.dev.yml down

cd ..
cd monitoring
docker-compose -f docker-compose.dev.yml down

cd ..
cd store
docker-compose -f docker-compose.dev.yml down

cd ..
cd modules-server
docker-compose -f docker-compose.dev.yml down

cd ..
cd traefik
docker-compose -f docker-compose.dev.yml down

docker system prune --force