FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install -g http-server

EXPOSE 5050

CMD ["http-server", "-p", "5050"]
