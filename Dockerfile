FROM node:18-alpine AS build

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install -g ionic
RUN npm install

# Bundle app source
COPY . .

RUN ionic build

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/www/ /usr/share/nginx/html/