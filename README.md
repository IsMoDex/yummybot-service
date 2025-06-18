# 🧠🍽️ YummyBot
[![License: MIT](https://img.shields.io/github/license/IsMoDex/YummyBot)](https://opensource.org/licenses/MIT)
[![Release](https://img.shields.io/github/v/release/IsMoDex/YummyBot?include_prereleases)](https://github.com/IsMoDex/YummyBot/releases)
[![Code Size](https://img.shields.io/github/languages/code-size/IsMoDex/YummyBot.svg)](https://github.com/IsMoDex/YummyBot)
[![Repo Stars](https://img.shields.io/github/stars/IsMoDex/YummyBot?style=social)](https://github.com/IsMoDex/YummyBot/stargazers)

YummyBot — это Telegram-бот, который помогает пользователю распознать содержимое холодильника по фото и предлагает рецепты из доступных продуктов. Проект разработан для дипломной работы.

---

## 🚀 Технологии

- **Node.js** + **TypeScript**
- **grammY** — Telegram Bot Framework
- **Prisma** — ORM
- **SQLite** — лёгкая встраиваемая БД
- **Neyro API** — взаимодействие с внешней нейросетью для распознавания продуктов по фото

---

## 📁 Структура проекта
```
src/
├── bot.ts # Инициализация и запуск бота
├── commands/ # Обработчики команд Telegram (/start, /add и т.д.)
├── database/
│ ├── client.ts # PrismaClient
│ └── queries/ # Запросы к БД
├── keyboards/ # Inline/Reply клавиатуры
├── middleware/ # Middleware для grammY
├── services/ # Вызовы к нейросети и бизнес-логика
└── utils/ # Вспомогательные утилиты
```

---

## ⚙️ Установка и первый запуск

```bash
# 1) Установить и сгенерировать Prisma Client
pnpm prisma generate

# 2) Применить миграции и создать/обновить dev.db
pnpm prisma migrate dev --name init

# 3) Заполнить базу начальными данными (seed)
pnpm run seed

# 4) Запустить бота в режиме разработки
pnpm run dev
```

### Если вы уже выполняли команды выше, то далее просто:

```bash
pnpm run dev
```


---
## 📦 .env пример
### Создай файл .env и добавь:
```
BOT_TOKEN=your_telegram_bot_token
DATABASE_URL="file:./dev.db"
NEURAL_API_URL=https://your-neural-api.com/recognize
NEURAL_API_KEY=your_api_key_if_needed
```
---
## 💡 Возможности
📸 Загрузка фото холодильника

🤖 Распознавание продуктов через нейросеть

📝 Список продуктов пользователя

🌍 Мультиязычная поддержка продуктов (RU/EN)

🍳 Подбор рецептов

❤️ Избранные рецепты

🧊 История распознаваний

---

## 📚 Команды бота

- `/start` — регистрация и приветствие
- `/help` — справка по всем командам
- `/products` — список ваших добавленных продуктов
- `/add <product_id>` — добавить продукт по его machine‑ID (например `apple`)
- `/remove <product_id>` — удалить продукт из списка
- `/clear` — очистить весь список продуктов
- `/upload` — загрузить фото холодильника для распознавания продуктов
- `/recipes` — получить подборку рецептов по вашим продуктам и любимым ингредиентам
- `/favorites` — показать сохранённые в избранное рецепты