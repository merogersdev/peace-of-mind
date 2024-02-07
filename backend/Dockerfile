FROM node:lts-bookworm-slim as backend
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "node", "./server.js"]