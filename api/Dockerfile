FROM node:lts

WORKDIR /usr/src/api

COPY . ./
RUN npm install

EXPOSE 80

CMD ["npm", "run", "start"]