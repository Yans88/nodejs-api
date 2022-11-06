FROM node:18.12-alpine
WORKDIR /usr/code

ENV MYSQL_HOST localhost
ENV MYSQL_DATABASE todo4
ENV MYSQL_USER root
ENV MYSQL_PASSWORD ""

COPY package.json .
RUN npm install
COPY . .
EXPOSE 3030
CMD ["npm", "run", "start"]