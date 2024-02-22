FROM node:18
RUN apt-get -y update && \
  apt-get install -yq openssl git ca-certificates tzdata && \
  ln -fs /usr/share/zoneinfo/Asia/Tehran /etc/localtime && \
  dpkg-reconfigure -f noninteractive tzdata
WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

ARG NEXT_PUBLIC_BACKEND_BASE_API=https://panel.menuma.online
ARG NEXT_PUBLIC_MENUMA_DOMAIN=menuma.online
ARG NEXT_PUBLIC_PANEL_URL=https://dashboard.menuma.online
ARG TZ="Asia/Tehran"

ENV NEXT_PUBLIC_BACKEND_BASE_API=${NEXT_PUBLIC_BACKEND_BASE_API}
ENV NEXT_PUBLIC_MENUMA_DOMAIN=${NEXT_PUBLIC_MENUMA_DOMAIN}
ENV NEXT_PUBLIC_PANEL_URL=${NEXT_PUBLIC_PANEL_URL}
ENV TZ=${TZ}
RUN npm i -g pnpm
RUN pnpm i

COPY . .

RUN pnpm build

EXPOSE 3000:3000

CMD ["pnpm", "start"]