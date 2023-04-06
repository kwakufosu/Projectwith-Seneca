FROM node:17-alpine
WORKDIR /app
COPY *.json .



RUN npm install
COPY . .

CMD ["npm","run","start"]
