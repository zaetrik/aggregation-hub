cd modules/google-search-results-modules
cp example.env ./.env
cp example.env ./dev.env

cd ../..
cd modules-server
cp example.env ./.env
cp example.env ./dev.env

cd ..
cd store
cp example.env ./.env
cp example.env ./dev.env

cd ..
cd traefik
cp example.env ./.env

cd ..
cd ui
cp example.env ./.env

sh start_services.sh