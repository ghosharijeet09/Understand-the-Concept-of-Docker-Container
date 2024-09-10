# syntax=docker/dockerfile:1

FROM node:20.16.0

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN ls -la /usr/src/app/node_modules

EXPOSE 5173

CMD ["pnpm", "dev"]