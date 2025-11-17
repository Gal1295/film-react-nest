FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY frontend/dist /usr/share/nginx/html
COPY nginx/nginx.prod.conf /etc/nginx/nginx.conf
EXPOSE 80 443