FROM node:14

RUN mkdir -p /usr/src/manager
ENV PORT 8002
ENV PUBLIC_URL=https://dsomething.cloudfront.net

WORKDIR /usr/src/manager

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . /usr/src/manager

# RUN yarn build

# EXPOSE 8002
# CMD [ "node", "index.js"]
CMD [ "yarn", "dev"]