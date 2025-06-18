# YummyBot/Dockerfile

# Stage 1: сборка
FROM node:20-alpine AS builder
WORKDIR /app

# 1) Устанавливаем все зависимости (dev + prod)
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm \
 && pnpm install --frozen-lockfile

# 2) Генерируем Prisma Client
COPY prisma ./prisma
RUN pnpm prisma generate

# 3) Копируем код и компилируем TypeScript
COPY tsconfig.json tsconfig.seed.json ./
COPY src ./src
RUN pnpm run build

# Stage 2: рантайм
FROM node:20-alpine
WORKDIR /app

# 4) Устанавливаем pnpm, prod-зависимости и CLI для сидов
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm \
 && pnpm install --prod --frozen-lockfile \
 && npm install -g ts-node typescript

# 5) Копируем схему Prisma и генерируем клиент
COPY prisma ./prisma
RUN pnpm prisma generate

# 6) Копируем билд и локали
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/locales ./dist/locales

# 7) Копируем оба tsconfig-а для сидов
COPY --from=builder /app/tsconfig.json .
COPY --from=builder /app/tsconfig.seed.json .

# 8) Точка входа: миграции, ваш seed и запуск бота
ENTRYPOINT ["sh", "-c", "\
  pnpm prisma migrate deploy && \
  pnpm run seed && \
  node dist/bot.js \
"]
