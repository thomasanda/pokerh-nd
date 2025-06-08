# Build stage
FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run sqlite:migrate
RUN npx shadcn@latest add badge button card scroll-area
RUN npm run build

# Production stage
FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/express-entry.ts ./express-entry.ts
COPY --from=builder /app/database ./database
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/server ./server

EXPOSE 3000

CMD ["npm", "run", "start"]
