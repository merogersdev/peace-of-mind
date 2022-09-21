# Backend - Production
FROM node:lts-alpine
WORKDIR /server
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 5000
CMD [ "node", "server.js" ]