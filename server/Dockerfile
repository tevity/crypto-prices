FROM node:12.16-alpine AS BUILD

LABEL maintainer="https://github.com/tevity"

WORKDIR /usr/local/src

COPY package*.json ./
RUN npm ci
COPY . .

RUN npm run lint:ci
RUN npm run test
RUN npm run build



FROM node:12.16-alpine AS PRODUCTION
ENV NODE_ENV=production
WORKDIR /usr/local/crypto-prices

COPY package*.json ./
RUN npm ci
COPY --from=BUILD /usr/local/src/dist ./dist

CMD ["npm", "run", "start:prod"]
