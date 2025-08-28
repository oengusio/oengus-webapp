FROM node:22.12.0-bookworm AS builder

WORKDIR /oengus-frontend
COPY package.json package-lock.json ./
# sigh, thanks fullcallendar
RUN npm ci --legacy-peer-deps
COPY . .
# PROFILE is either production, sandbox or production-dev
ARG PROFILE
RUN npm run build -- --configuration $PROFILE

FROM nginx:alpine

WORKDIR /oengus-frontend
COPY ./nginx.conf /etc/nginx/nginx.conf
## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /oengus-frontend/dist/ /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
