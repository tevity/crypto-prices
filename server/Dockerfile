FROM node:12.16-alpine AS BUILD

LABEL maintainer="https://github.com/tevity"

WORKDIR /src

COPY package*.json /src/
RUN npm ci
COPY . .

RUN npm run lint:ci
RUN npm run test
RUN npm run build



FROM node:12.16-alpine AS PRODUCTION
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci
COPY --from=BUILD /src/dist ./dist

CMD ["npm", "run", "start:prod"]
