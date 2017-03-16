#!/bin/bash -e
if [ $# -ne 1 ]; then
  echo 'Usage: prod.sh [version]'
  exit 1
fi
docker run --name mongo --restart always -v /var/opt/mongo/:/data/db -d mongo:3.4.1
docker run -d --name hotscounter --restart always --link mongo:mongo -p 80:8080 hotscounter:${1}
