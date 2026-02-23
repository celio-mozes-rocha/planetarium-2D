# Étape 1 : build de l'application
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci
RUN npm install
COPY . .
RUN npm run build

# Étape 2 : serveur nginx ultra léger
FROM nginx:alpine

RUN apk update && apk upgrade

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
