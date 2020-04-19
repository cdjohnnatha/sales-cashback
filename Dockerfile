 
FROM node:13.3

WORKDIR /usr/src/app
COPY package.json ./

RUN npm install

COPY . .


EXPOSE 3000

CMD ["npm", "start"]