FROM node:18.16.0 as frontend
ENV NODE_ENV=production

WORKDIR /frontend
COPY frontend/package*.json .
RUN yarn install
COPY frontend .
RUN yarn run build

FROM node:18.16.0 as backend
ENV NODE_ENV=production
WORKDIR /backend
COPY backend/package*.json .
RUN yarn install
COPY backend /app/backend
WORKDIR /
COPY --from=frontend /frontend/build /app/frontend/build
WORKDIR /app/backend
EXPOSE 5000
CMD ["npm","run","start"]