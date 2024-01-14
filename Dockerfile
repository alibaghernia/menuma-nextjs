FROM node:18 AS base

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

ENV NEXT_PUBLIC_BACKEND_BASE_API=https://panel.menuma.online
ENV NEXT_PUBLIC_MENUMA_DOMAIN=menuma.online

RUN npm i -g pnpm
RUN pnpm i

COPY . .

RUN pnpm build

EXPOSE 3000:3000

CMD ["pnpm", "start"]