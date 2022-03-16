FROM node:alpine

WORKDIR /etc/nest-micro-api

COPY package*.json ./
RUN yarn

COPY . .
RUN yarn build

EXPOSE 3000
CMD [ "yarn", "start" ]
