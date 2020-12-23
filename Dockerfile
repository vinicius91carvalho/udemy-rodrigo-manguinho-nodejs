FROM node:14

WORKDIR /usr/clean-node-api

COPY ./package.json .

RUN npm install --only=prod

