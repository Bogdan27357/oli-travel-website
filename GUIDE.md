# 🌴 Oli Travel - Полное руководство

## 📋 Содержание

1. [О проекте](#о-проекте)
2. [Быстрый старт](#быстрый-старт)
3. [Структура проекта](#структура-проекта)
4. [Развертывание](#развертывание)
5. [Управление данными](#управление-данными)
6. [Полезные команды](#полезные-команды)

---

## 🎯 О проекте

**Oli Travel** - современный сайт турагентства с полным функционалом:

### ✨ Возможности:
- 🔍 Поиск и фильтрация туров
- 🌍 Каталог туров (заграница + Россия)
- 🏨 217 отелей с подробной информацией
- 💬 Онлайн-чат с посетителями
- ⭐ Система отзывов
- 📧 Формы обратной связи
- 📊 Админ-панель управления

### 🛠️ Технологии:
- Frontend: React 18 + TypeScript + Tailwind CSS
- Database: PostgreSQL 15
- Deployment: Docker + Nginx + Let's Encrypt

---

## 🚀 Быстрый старт

### Локальная разработка:

```bash
npm install
npm run dev
# Открыть: http://localhost:5173
```

### Развертывание на Рег.ру:

**Простой способ (статика):**
```bash
npm run build
# Загрузите dist/ → public_html/
```

**Полный способ (VPS):**
```bash
git clone ваш-репозиторий
cd проект
cp .env.example .env
nano .env
./scripts/deploy.sh
```

📖 Подробнее: [QUICKSTART.md](QUICKSTART.md) и [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 📁 Структура проекта

```
📦 oli-travel-website/
│
├── 📂 src/                    # Исходный код
│   ├── components/            # React компоненты
│   ├── pages/                 # Страницы
│   └── lib/                   # Утилиты
│
├── 📂 db_migrations/          # SQL миграции
├── 📂 scripts/                # Bash скрипты
├── 📂 nginx/                  # Конфигурация Nginx
├── 📂 exports/                # Экспорт данных
│
├── 📄 docker-compose.yml      # Docker конфигурация
├── 📄 Dockerfile              # Docker образ
├── 📄 .env.example            # Переменные окружения
│
└── 📖 Документация/
    ├── QUICKSTART.md          # Быстрый старт
    ├── DEPLOYMENT.md          # Развертывание
    └── GUIDE.md               # Это руководство
```

---

## 🗄️ База данных

### Таблицы:

| Название | Описание |
|----------|----------|
| `tours` | Туры и путевки |
| `bookings` | Бронирования |
| `reviews` | Отзывы клиентов |
| `contact_requests` | Заявки |
| `chat_sessions` | Сессии чата |
| `chat_messages` | Сообщения |
| `admins` | Администраторы |
| `users` | Пользователи |

Полная схема: [db_migrations/V1__initial_schema.sql](db_migrations/V1__initial_schema.sql)

---

## 📦 Развертывание

### Вариант А: Статический хостинг Рег.ру

**Шаги:**
1. Соберите: `npm run build`
2. Загрузите `dist/` в `public_html/`
3. Готово!

**Плюсы:** Быстро, просто  
**Минусы:** Backend остается на poehali.dev

---

### Вариант Б: VPS с Docker

**Шаги:**

1. **Установите Docker:**
```bash
curl -fsSL https://get.docker.com | sh
```

2. **Клонируйте проект:**
```bash
git clone https://github.com/ваш-username/проект.git
cd проект
```

3. **Настройте `.env`:**
```bash
cp .env.example .env
nano .env
```

4. **Разверните:**
```bash
chmod +x scripts/*.sh
./scripts/deploy.sh
```

5. **Настройте SSL:**
```bash
./scripts/setup-ssl.sh ваш-домен.ru
```

**Плюсы:** Полный контроль  
**Минусы:** Требует настройки

---

## 💾 Управление данными

### Экспорт из poehali.dev

1. **Откройте админку** poehali.dev
2. **Выполните SQL:**
```sql
SELECT * FROM tours;
SELECT * FROM reviews;
SELECT * FROM bookings;
```
3. **Сохраните** в `exports/backup.sql`

### Импорт на новый сервер

```bash
./scripts/import-data.sh
```

### Резервное копирование

```bash
# Создать бэкап
./scripts/backup.sh

# Восстановить
./scripts/restore.sh backups/файл.sql.gz
```

### Автоматический бэкап

```bash
crontab -e
# Добавьте:
0 3 * * * /path/to/project/scripts/backup.sh
```

---

## 🛠️ Полезные команды

### Разработка:

```bash
npm run dev          # Dev сервер
npm run build        # Сборка
npm run preview      # Предпросмотр
```

### Docker:

```bash
# Управление
docker-compose up -d              # Запуск
docker-compose down               # Остановка
docker-compose restart app        # Перезапуск
docker-compose logs -f app        # Логи

# Обновление
git pull
./scripts/deploy.sh
```

### База данных:

```bash
# Подключение
docker-compose exec postgres psql -U olitravel_user -d olitravel

# Бэкап
./scripts/backup.sh

# Восстановление
./scripts/restore.sh backup.sql.gz
```

---

## 🔐 Безопасность

### ⚠️ Обязательно измените:

В `.env` файле:
- `JWT_SECRET` - уникальный ключ
- `ADMIN_PASSWORD` - надежный пароль
- `MANAGER_PASSWORD` - надежный пароль

### ✅ Рекомендации:

1. Всегда используйте HTTPS
2. Делайте регулярные бэкапы
3. Обновляйте зависимости: `npm update`
4. Мониторьте логи: `docker-compose logs -f`

---

## 🐛 Решение проблем

### Приложение не запускается

```bash
docker-compose logs app
docker-compose restart app
```

### База данных недоступна

```bash
docker-compose ps postgres
docker-compose restart postgres
```

### 502 Bad Gateway

```bash
curl http://localhost:3000
docker-compose restart nginx
```

### SSL не работает

```bash
./scripts/setup-ssl.sh ваш-домен.ru
```

---

## 📚 Документация

- **QUICKSTART.md** - Быстрый старт за 5 минут
- **DEPLOYMENT.md** - Подробное развертывание
- **GUIDE.md** - Это руководство

---

## 🎨 Кастомизация

### Цвета:

`tailwind.config.ts`:
```typescript
colors: {
  primary: "#0EA5E9",      // Основной
  secondary: "#F59E0B",    // Вторичный
}
```

### Контакты:

- `src/components/Footer.tsx`
- `src/components/ContactForm.tsx`

---

## 📞 Поддержка

- **Документация Рег.ру**: https://www.reg.ru/support/
- **Docker Docs**: https://docs.docker.com/
- **PostgreSQL**: https://www.postgresql.org/docs/

---

**Успехов с запуском! 🚀**
