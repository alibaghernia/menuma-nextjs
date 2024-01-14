FROM node:18 AS base

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

ARG NEXT_PUBLIC_BACKEND_BASE_API=https://panel.menuma.online
ARG NEXT_PUBLIC_MENUMA_DOMAIN=menuma.online

ENV NEXT_PUBLIC_BACKEND_BASE_API=${NEXT_PUBLIC_BACKEND_BASE_API}
ENV NEXT_PUBLIC_MENUMA_DOMAIN=${NEXT_PUBLIC_MENUMA_DOMAIN}

RUN npm i -g pnpm
RUN pnpm i

COPY . .

# RUN pnpm build

EXPOSE 3000:3000

CMD ["sh", "-c", "/app/pnpm build && /app/pnpm start"]