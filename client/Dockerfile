FROM node:12.16-alpine AS BUILD

LABEL maintainer="https://github.com/tevity"

WORKDIR /usr/local/src

COPY package*.json ./
# node-gyp needs Python installed, so put it in for npm ci, then remove again to keep image small
RUN apk --no-cache add --virtual native-deps \
    g++ gcc libgcc libstdc++ linux-headers make python && \
    npm ci && \
    apk del native-deps
COPY . .

RUN npm run lint

# karma needs a browser installed, so install chromium then remove again to keep image small
ENV CHROME_BIN=chromium-browser
RUN apk --no-cache add --virtual native-deps \
    chromium && \
    npm run test:ci && \
    apk del native-deps

RUN npm run build:prod



FROM nginx:1.17 AS PRODUCTION
COPY --from=BUILD /usr/local/src/dist /usr/share/nginx/html
COPY /nginx-custom.conf /etc/nginx/nginx.conf
