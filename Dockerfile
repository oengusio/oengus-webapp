FROM node:lts-alpine AS builder
ENV NODE_ENV=production DISABLE_OPENCOLLECTIVE=true
WORKDIR /oengus-webapp
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm ci --also=dev --silent && mv node_modules ../
COPY . .
RUN npm run build

FROM node:lts-alpine AS host
ENV NODE_ENV=production HOST=0.0.0.0 DISABLE_OPENCOLLECTIVE=true
WORKDIR /oengus-webapp
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm ci --silent
COPY ["nuxt.config.js", "vue-i18n.config.js", "./"]
COPY static ./static
COPY --from=builder /oengus-webapp/.nuxt ./.nuxt
EXPOSE 3000
CMD ["npm", "start"]
