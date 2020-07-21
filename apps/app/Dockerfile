FROM node:10-alpine
WORKDIR /invest-insight/app
COPY package*.json ./
RUN yarn install --silent
COPY . .
EXPOSE 8080
CMD ["yarn", "dev"]

