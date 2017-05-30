#!/bin/bash
if [ $# -ne 1 ]; then
  echo 'Usage: prod.sh [version]'
  exit 1
fi
docker stop hotscounter || echo 'fine'
docker rm hotscounter || echo 'fine'
docker run -d --name hotscounter --restart always --link mongo:mongo -p 80:8080 evertras/hotscounter:${1}
