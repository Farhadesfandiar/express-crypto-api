FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install express mongoose body-parser

COPY . .

# Expose the port your app runs on
EXPOSE 3000

CMD ["npm", "start"]