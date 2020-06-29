FROM node:13.12.0-alpine

WORKDIR /usr/src/app

COPY . ./
RUN npm install --only=production
RUN npm install -g serve
RUN serve -v
RUN ls

RUN npm run build

EXPOSE 80

CMD ["serve", "-l", "80", "build"]