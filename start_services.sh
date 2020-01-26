#!/bin/bash

cd traefik
mkdir -p logs
docker-compose -f docker-compose.dev.yml up -d

cd ..
cd store
mkdir -p logs
mkdir -p elasticsearch-data
docker-compose -f docker-compose.dev.yml up -d

cd ..
cd monitoring
mkdir -p filebeat-data
docker-compose -f docker-compose.dev.yml up -d

cd ..
cd modules-server
mkdir -p logs
mkdir -p postgres-data
docker-compose -f docker-compose.dev.yml up -d

cd ..
cd ui
mkdir -p logs
docker-compose -f docker-compose.dev.yml up -d

cd ..
cd modules/typescript-express-module-example
mkdir -p logs
docker-compose -f docker-compose.dev.yml up -d

cd ../..
cd modules/google-search-results-module
mkdir -p logs
docker-compose -f docker-compose.dev.yml up -d