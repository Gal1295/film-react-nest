FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

RUN npm install -g @nestjs/cli

COPY src ./src
COPY tsconfig*.json ./
COPY public ./public

RUN npm run build

RUN rm -rf src tsconfig*.json node_modules/.cache && \
    npm ci --only=production --legacy-peer-deps

FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./

COPY --from=builder /usr/src/app/public ./public

EXPOSE 3000

CMD ["node", "dist/main.js"]