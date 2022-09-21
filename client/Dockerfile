# Frontend Stage 1 - Run React Build for Production
FROM node:lts-alpine as build
WORKDIR /client
ENV PATH /client/node_modules/.bin:$PATH
COPY ./package.json /client/
COPY ./package-lock.json /client/
RUN npm i
COPY . /client
RUN npm run build

# Frontend Stage 2 - Take build and copy to NGINX
FROM nginx:alpine
COPY --from=build /client/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]