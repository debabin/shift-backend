ARG MONGODB_URL
FROM node

WORKDIR /app
COPY package*.json ./
RUN yarn install

COPY . .

RUN yarn build

CMD [ "yarn", "prod" ]