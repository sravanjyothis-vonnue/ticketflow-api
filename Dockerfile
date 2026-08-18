FROM node:22-alpine AS base

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json eslint.config.js prettier.config.js ./
COPY prisma ./prisma
RUN npx prisma generate

COPY src ./src

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
