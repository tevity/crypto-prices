FROM alpine:3.11 AS BUILD

LABEL maintainer="https://github.com/tevity"

WORKDIR /src

RUN apk add npm
RUN apk add chromium
RUN npm i -g @angular/cli
ENV CHROME_BIN=chromium-browser

COPY package*.json /src/

RUN npm ci

COPY . /src

RUN ng lint
RUN ng test --watch=false
RUN ng build --aot --buildOptimizer --prod

FROM nginx:1.17
COPY --from=BUILD /src/dist /usr/share/nginx/html
COPY /nginx-custom.conf /etc/nginx/nginx.conf
