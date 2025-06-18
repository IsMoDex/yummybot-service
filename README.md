# 🍽️ YummyBot Service

**YummyBot Service** — это микросервис Telegram-бота, отвечающий за логику взаимодействия с пользователем, хранение данных и связь с детектором продуктов.

## 📖 Описание

Бот позволяет:
- Распознавать продукты по фото через отдельный микросервис `fridge-detector`.
- Хранить список доступных пользователю продуктов в SQLite.
- Подбирать рецепты по текущему списку продуктов и сохранённым избранным.
- Работать на нескольких языках (RU/EN).
- Сохранять историю запросов и статистику.

## 🛠️ Стек технологий

- **Node.js** 20 + **TypeScript**
- **grammY** — фреймворк для Telegram-ботов
- **Prisma** — ORM
- **SQLite** — встраиваемая лёгкая база данных
- **Docker & Docker Compose** — контейнеризация
- **fridge-detector** — внешний микросервис на Python + FastAPI

## 📁 Структура проекта

```
yummybot-service/
├── prisma/                    # Миграции и схема БД
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── bot.ts                 # Точка входа: инициализация grammY
│   ├── commands/              # Обработчики Telegram-команд
│   ├── database/
│   │   ├── client.ts          # PrismaClient
│   │   └── queries/           # Функции запросов к БД
│   ├── services/
│   │   └── imageService.ts    # Логика запроса к детектору продуктов
│   ├── utils/                 # Вспомогательные функции
│   └── i18n.ts                # Загрузка локалей
├── Dockerfile                 # Сборка и запуск контейнера
├── docker-compose.yml         # Оркестровка bot + detector
├── tsconfig.json              # Конфиг TS для сборки
├── tsconfig.seed.json         # Конфиг TS для сидов
├── package.json
├── pnpm-lock.yaml
└── .env                       # Переменные окружения (пример ниже)
```

## 🔧 Установка и запуск без Docker

1. Клонировать репозиторий и перейти в папку сервиса:
   ```bash
   git clone https://github.com/IsMoDex/yummybot-service.git
   cd yummybot-service
   ```
2. Установить зависимости и сгенерировать Prisma Client:
   ```bash
   pnpm install
   pnpm prisma generate
   ```
3. Настроить базу данных и набить начальными данными:
   ```bash
   pnpm prisma migrate dev --name init
   pnpm run seed
   ```
4. Запустить в режиме разработки:
   ```bash
   pnpm run dev
   ```

## 🐳 Запуск через Docker Compose

В корне репозитория (`E:\Projects\YummyBot`) есть `docker-compose.yml`, поднимающий два сервиса:

```bash
docker-compose up -d --build
```

- **bot** (`yummybot-service`)
- **detector** (`fridge-detector`)

Проверить статус:
```bash
docker-compose ps
```

Просмотр логов:
```bash
docker-compose logs -f detector bot
```

## 📦 Docker вручную

Если нужен только бот:
```powershell
cd yummybot-service

# Собрать образ без кеша
docker build --no-cache -t yummybot-service .

# Запустить контейнер (смонтировать папку prisma для dev.db)
docker rm -f yummybot-service 2>$null
docker run -d --name yummybot-service   --env-file ./.env   -v "${PWD}/prisma:/app/prisma"   yummybot-service
```

> По умолчанию бот использует Telegram API без прямого HTTP-порта.

## ⚙️ Переменные окружения

Создайте файл `.env` в корне **yummybot-service** или в корне репо:

```dotenv
BOT_TOKEN=your_telegram_bot_token
DATABASE_URL="file:./prisma/dev.db"
DETECTOR_URL=http://detector:8000
```

- `BOT_TOKEN` — токен вашего бота в BotFather.
- `DATABASE_URL` — строка подключения SQLite.
- `DETECTOR_URL` — URL микросервиса для распознавания.

## 📚 Команды бота

- `/start` — приветствие и регистрация
- `/help` — справка
- `/products` — показать список продуктов
- `/add <product_id>` — добавить продукт
- `/remove <product_id>` — удалить продукт
- `/clear` — очистить список
- `/upload` — загрузить фото для распознавания
- `/recipes` — подборка рецептов
- `/favorites` — избранные рецепты

## 🤝 Вклад и лицензия

PR и issue приветствуются!  
Лицензия — MIT © [IsMoDex](https://github.com/IsMoDex)
