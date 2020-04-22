FROM node:12.16-alpine AS BUILD

LABEL maintainer="https://github.com/tevity"

WORKDIR /usr/local/src

# Needed to run karma tests
RUN apk add chromium
ENV CHROME_BIN=chromium-browser

COPY package*.json ./
RUN npm ci
COPY . .

RUN npm run lint
RUN npm run test:ci
RUN npm run build:prod



FROM nginx:1.17 AS PRODUCTION
COPY --from=BUILD /usr/local/src/dist /usr/share/nginx/html
COPY /nginx-custom.conf /etc/nginx/nginx.conf
