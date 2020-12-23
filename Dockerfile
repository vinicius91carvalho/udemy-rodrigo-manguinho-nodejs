FROM node:14

WORKDIR /usr/clean-node-api

RUN npm install --only=prod

