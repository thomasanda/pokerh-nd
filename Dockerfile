FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

RUN echo 'DATABASE_URL="sqlite.db"' > .env

RUN npm run sqlite:migrate
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
