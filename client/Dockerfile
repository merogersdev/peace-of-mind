# Frontend Stage 1 - Run Vite Build for Production
FROM node:lts-alpine as build
WORKDIR /client
ENV PATH /client/node_modules/.bin:$PATH
COPY ./package*.json ./
RUN npm i
COPY . .
RUN npm run build

# Frontend Stage 2 - Take Vite build folder and copy to NGINX
FROM nginx:alpine
COPY --from=build /client/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]