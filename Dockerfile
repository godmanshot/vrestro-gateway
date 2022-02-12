FROM node:14-alpine As development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD npm run start:dev



FROM node:14-alpine As production

EXPOSE 3000

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /app/dist ./dist

CMD node dist/main