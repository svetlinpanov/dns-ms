FROM node:current

WORKDIR /app

# only copy package.json and the lock.json initially so that `npm install` layer is recreated only
# if there are changes in package.json
COPY package*.json ./
RUN yarn

COPY . /app

CMD [ "npm", "start" ]