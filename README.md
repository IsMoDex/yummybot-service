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

## ⚙️ Установка и запуск

```bash
# Установка зависимостей
npm install
```
```bash
# Генерация Prisma Client
npx prisma generate
```
```bash
# Миграция БД
npx prisma migrate dev --name init
```
```bash
# Запуск бота
npm run dev
```
---
## 📦 .env пример
### Создай файл .env и добавь:

BOT_TOKEN=your_telegram_bot_token
DATABASE_URL="file:./dev.db"
NEURAL_API_URL=https://your-neural-api.com/recognize
NEURAL_API_KEY=your_api_key_if_needed
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
```
/start — Начать работу
/help — Помощь
/products — Мои продукты
/add <название> — Добавить продукт
/remove <название> — Удалить продукт
/upload — Загрузить фото
/recipes — Найти рецепты
/favorites — Избранные рецепты
/clear — Очистить продукты
```


