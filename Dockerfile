# Stage 1: сборка
FROM node:20-alpine AS builder
WORKDIR /app

# 1) Устанавливаем зависимости
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm \
 && pnpm install --frozen-lockfile

# 2) Генерируем Prisma‐клиент
COPY prisma ./prisma
RUN pnpm prisma generate

# 3) Копируем и компилируем TS-код
COPY tsconfig.json tsconfig.seed.json ./
COPY src ./src
RUN pnpm run build

# Stage 2: рантайм
FROM node:20-alpine AS runtime
WORKDIR /app

# 4) Устанавливаем только production-зависимости
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
RUN npm install -g pnpm \
 && pnpm install --prod --frozen-lockfile

# 5) Копируем результат компиляции и ресурсы
COPY --from=builder /app/dist ./dist
# Критично: кладём ваши JSON-локали рядом с JS-файлами
COPY --from=builder /app/src/locales ./dist/locales

# 6) Копируем Prisma-папку, чтобы client мог подгрузить схему при старте
COPY --from=builder /app/prisma ./prisma
RUN pnpm prisma generate

# 7) Опционально: копируем .env, если вы не монтируете его извне
# COPY .env .env

# 8) Точка входа
CMD ["node", "dist/bot.js"]
