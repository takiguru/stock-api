FROM node:12.16.0-alpine
USER root
WORKDIR /opt/stock-api
COPY package.json package-lock.json /opt/stock-api/
RUN npm install --only=prod
COPY src /opt/stock-api/src
COPY config /opt/stock-api/config
ENV NODE_ENV='production'
RUN node src/server.js
EXPOSE 3000

