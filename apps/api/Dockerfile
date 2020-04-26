FROM node:10-alpine
WORKDIR /invest-insight/api
COPY package*.json ./
COPY . .
RUN npm install --silent
EXPOSE 3000
CMD ["npm", "start"]
