#!/bin/bash

docker run --name mongo -v ${PWD}/tmp:/data/db -d mongo:3.4.1

