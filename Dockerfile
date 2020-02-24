FROM node:12-alpine
WORKDIR /server
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . /server/
EXPOSE 4000
CMD [ "yarn", "start"]
