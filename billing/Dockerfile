FROM node:alpine

WORKDIR /etc/nest-micro-billing

COPY package*.json ./
RUN yarn

COPY . .
RUN yarn build

CMD [ "yarn", "start" ]
