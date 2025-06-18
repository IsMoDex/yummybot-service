# Dockerfile for YummyBot (multi-stage build with locales)

# Stage 1: build
FROM node:20-alpine AS builder
WORKDIR /app

# 1) Install all dependencies (dev + prod)
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm \
 && pnpm install --frozen-lockfile

# 2) Generate Prisma Client
COPY prisma ./prisma
RUN pnpm prisma generate

# 3) Compile TypeScript to JavaScript
COPY tsconfig.json tsconfig.seed.json ./
COPY src ./src
RUN pnpm run build

# Stage 2: runtime
FROM node:20-alpine AS runtime
WORKDIR /app

# 4) Install pnpm and production dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm \
 && pnpm install --prod --frozen-lockfile

# 5) Copy Prisma schema & regenerate client in runtime
COPY prisma ./prisma
RUN pnpm prisma generate

# 6) Copy compiled code
COPY --from=builder /app/dist ./dist

# 7) Copy JSON locales into dist
COPY --from=builder /app/src/locales ./dist/locales

# 8) Entrypoint: run migrations, seed DB, then start the bot
ENTRYPOINT ["sh", "-c", "pnpm prisma migrate deploy && pnpm prisma db seed && node dist/bot.js"]
