# Frontend Stage 1 - Run React Build for Production
FROM node:lts-alpine as build
WORKDIR /frontend
ENV PATH /frontend/node_modules/.bin:$PATH
COPY ./package.json /frontend/
COPY ./package-lock.json /frontend/
RUN npm i
COPY . /frontend
RUN npm run build

# Frontend Stage 2 - Take build and copy to NGINX
FROM nginx:alpine
COPY --from=build /frontend/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]