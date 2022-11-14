#!/usr/bin/env bash

docker exec -it $(docker ps -aqf "name=cloudflare-nginx-nginx-1") nginx -s reload
