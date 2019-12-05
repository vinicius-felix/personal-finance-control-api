# Dockerfile api
FROM node:10.11

RUN mkdir /usr/share/app

WORKDIR /usr/share/app

ADD package.json ./package.json

RUN npm install

CMD ['node', 'src/index.js']