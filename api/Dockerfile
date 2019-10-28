FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 4000

CMD [ "nodemon", "app.js" ]

# FROM node:10-alpine
# ADD . /var/app
# WORKDIR /var/app
# RUN npm install
# RUN npm rebuild node-sass
# CMD npm start
# EXPOSE 4000