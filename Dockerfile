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

# 3) Компилируем TypeScript в JavaScript
COPY tsconfig.json tsconfig.seed.json ./
COPY src ./src
RUN pnpm run build

# Stage 2: рантайм
FROM node:20-alpine
WORKDIR /app

# 4) Ставим pnpm и prod-зависимости
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm \
 && pnpm install --prod --frozen-lockfile

# 5) Копируем схему Prisma
COPY prisma ./prisma
# Клиент регенерируем заново, чтобы миграции в entrypoint могли работать
RUN pnpm prisma generate

# 6) Копируем собранный код и локали
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/locales ./dist/locales

# 7) Точка входа: миграции, сиды и запуск бота
ENTRYPOINT ["sh", "-c", "\
  pnpm prisma migrate deploy && \
  pnpm prisma db seed && \
  node dist/bot.js \
"]
