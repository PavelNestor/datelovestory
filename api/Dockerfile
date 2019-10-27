FROM node:10-alpine
ADD . /var/app
WORKDIR /var/app
RUN npm install
RUN npm rebuild node-sass
CMD npm start
EXPOSE 4000