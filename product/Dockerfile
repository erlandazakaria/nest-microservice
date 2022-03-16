FROM node:alpine

WORKDIR /etc/nest-micro-product

COPY package*.json ./
RUN yarn

COPY . .
RUN yarn build

CMD [ "yarn", "start" ]
