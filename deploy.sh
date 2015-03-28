#!/bin/bash
set -e

PROJECT_NAME=$1
PROJECT_VERSION=$2

rm -rf $PROJECT_NAME
unzip $PROJECT_NAME.zip -d $PROJECT_NAME

DOCKER_IMAGE_NAME=$(echo "$PROJECT_NAME" | tr '[:upper:]' '[:lower:]')

docker build -t "$DOCKER_IMAGE_NAME:$PROJECT_VERSION" $PROJECT_NAME

docker kill $DOCKER_IMAGE_NAME || true
docker rm --force $DOCKER_IMAGE_NAME || true

docker run --restart="always" -d --name $DOCKER_IMAGE_NAME -p 80:80 $DOCKER_IMAGE_NAME:$PROJECT_VERSION
