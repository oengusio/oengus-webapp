FROM node:14.15.1 AS builder

WORKDIR /oengus-frontend
COPY package.json package-lock.json ./
RUN npm ci --production
COPY . .
# PROFILE is either production or sandbox
RUN npm run build -- --prod --c=$PROFILE

FROM node:14.15.1

COPY --from=builder ./dist/ .

# serve index.html
