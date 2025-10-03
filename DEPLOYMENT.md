# 🚀 Инструкция по размещению сайта на Рег.ру

## 📋 Содержание
1. [Подготовка проекта](#подготовка-проекта)
2. [Размещение на Рег.ру](#размещение-на-регру)
3. [Настройка базы данных](#настройка-базы-данных)
4. [Подключение домена](#подключение-домена)
5. [Где хранятся данные](#где-хранятся-данные)

---

## 1️⃣ Подготовка проекта

### Скачивание кода с GitHub

1. **Подключите GitHub** (если еще не подключен):
   - В редакторе poehali.dev: `Скачать → Подключить GitHub`
   - Выберите аккаунт и создайте репозиторий

2. **Скачайте код**:
   - В редакторе: `Скачать → Скачать билд`
   - Или клонируйте из GitHub: `git clone https://github.com/ваш-username/ваш-репозиторий.git`

---

## 2️⃣ Размещение на Рег.ру

### Вариант А: Статический хостинг (только frontend)

**Что работает:**
- ✅ Все страницы сайта
- ✅ Формы (через внешний API)
- ❌ База данных (нужен отдельный хостинг)
- ❌ Backend функции (нужен Node.js хостинг)

**Шаги:**

1. **Соберите проект**:
   ```bash
   npm install
   npm run build
   ```
   Результат: папка `dist/` с готовым сайтом

2. **Загрузите на Рег.ру**:
   - Войдите в панель управления Рег.ру
   - Перейдите в "Файловый менеджер"
   - Удалите все из папки `public_html/`
   - Загрузите содержимое папки `dist/` в `public_html/`

3. **Настройте домен**:
   - В панели Рег.ру: "Домены" → Ваш домен → "DNS"
   - Убедитесь, что A-запись указывает на IP хостинга

---

### Вариант Б: VPS/VDS хостинг (полный функционал)

**Что работает:**
- ✅ Frontend
- ✅ Backend функции
- ✅ База данных
- ✅ Все функции сайта

**Требования:**
- VPS с Ubuntu 20.04+
- Node.js 18+
- PostgreSQL 13+

**Шаги:**

1. **Подключитесь к VPS**:
   ```bash
   ssh root@ваш-ip-адрес
   ```

2. **Установите Node.js**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Установите PostgreSQL**:
   ```bash
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   ```

4. **Клонируйте проект**:
   ```bash
   git clone https://github.com/ваш-username/ваш-репозиторий.git
   cd ваш-репозиторий
   npm install
   ```

5. **Настройте переменные окружения**:
   ```bash
   nano .env
   ```
   
   Добавьте:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/dbname
   JWT_SECRET=ваш-секретный-ключ
   ADMIN_PASSWORD=ваш-пароль-админа
   MANAGER_PASSWORD=пароль-менеджера
   ```

6. **Соберите и запустите**:
   ```bash
   npm run build
   npm install -g serve
   serve -s dist -l 3000
   ```

7. **Настройте Nginx** (для production):
   ```bash
   sudo apt install nginx
   sudo nano /etc/nginx/sites-available/default
   ```
   
   Конфигурация:
   ```nginx
   server {
       listen 80;
       server_name ваш-домен.ru;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

8. **Перезапустите Nginx**:
   ```bash
   sudo systemctl restart nginx
   ```

---

## 3️⃣ Настройка базы данных

### На VPS (рекомендуется)

1. **Создайте базу данных**:
   ```bash
   sudo -u postgres psql
   CREATE DATABASE olitravel;
   CREATE USER olitravel_user WITH PASSWORD 'ваш_пароль';
   GRANT ALL PRIVILEGES ON DATABASE olitravel TO olitravel_user;
   \q
   ```

2. **Примените миграции**:
   ```bash
   # Файлы миграций находятся в db_migrations/
   psql -U olitravel_user -d olitravel -f db_migrations/V1__initial_schema.sql
   ```

### На внешнем хостинге (альтернатива)

Используйте:
- **Supabase** (бесплатный PostgreSQL) - https://supabase.com
- **ElephantSQL** (бесплатный до 20MB) - https://www.elephantsql.com
- **Neon** (бесплатный PostgreSQL) - https://neon.tech

Получите `DATABASE_URL` и добавьте в `.env`

---

## 4️⃣ Подключение домена

### Если домен на Рег.ру:

1. Перейдите в "Домены" → Ваш домен
2. Откройте "Управление DNS"
3. Добавьте/измените записи:
   ```
   A-запись: @ → IP вашего VPS
   CNAME: www → ваш-домен.ru
   ```

### Если домен на другом регистраторе:

1. В панели регистратора укажите NS-серверы Рег.ру:
   ```
   ns1.reg.ru
   ns2.reg.ru
   ```

2. Или укажите A-запись на IP вашего VPS

---

## 5️⃣ Где хранятся данные

### ✅ **ТЕКУЩЕЕ ХРАНИЛИЩЕ (poehali.dev)**

Пока сайт на poehali.dev, данные хранятся:

| Тип данных | Где хранится | Доступ |
|------------|--------------|--------|
| **Отзывы** | PostgreSQL база данных проекта | Через админ-панель `/admin/reviews` |
| **Туры** | PostgreSQL база данных проекта | Через админ-панель `/admin/tours` |
| **Заявки** | PostgreSQL база данных проекта | Через админ-панель `/admin/submissions` |
| **Сообщения чата** | PostgreSQL база данных проекта | Через `/admin/chat` |
| **Файлы (изображения)** | Хранилище poehali.dev | В папке `/public/img/` |

### 📦 **ПОСЛЕ ПЕРЕНОСА НА СВОЙ ДОМЕН**

#### Вариант 1: Статический хостинг Рег.ру
```
Frontend → Рег.ру хостинг
Backend → Остается на poehali.dev (функции продолжат работать)
База данных → Остается на poehali.dev
Изображения → Копируются на Рег.ру
```

**Плюсы:** Простота, быстрый перенос  
**Минусы:** Зависимость от poehali.dev для backend

#### Вариант 2: VPS на Рег.ру (полный перенос)
```
Frontend → VPS Рег.ру
Backend → VPS Рег.ру (Node.js)
База данных → PostgreSQL на VPS или внешний сервис
Изображения → VPS Рег.ру
```

**Плюсы:** Полный контроль, независимость  
**Минусы:** Требует настройки сервера

---

## 📊 Экспорт данных с poehali.dev

### Экспорт базы данных:

Используйте SQL запросы в админке poehali.dev:

```sql
-- Экспорт отзывов
SELECT * FROM reviews;

-- Экспорт туров
SELECT * FROM tours;

-- Экспорт заявок
SELECT * FROM contact_requests;
```

Сохраните результаты в CSV или выполните:

```bash
# Если есть доступ к базе
pg_dump -U username -d database_name > backup.sql
```

---

## ⚠️ ВАЖНО: Что нужно обновить при переносе

### 1. Backend API URLs

В коде замените:
```javascript
// Было (poehali.dev):
const API_URL = 'https://functions.poehali.dev/...';

// Стало (ваш домен):
const API_URL = 'https://ваш-домен.ru/api/...';
```

### 2. Переменные окружения

Создайте файл `.env`:
```env
VITE_API_URL=https://ваш-домен.ru/api
DATABASE_URL=postgresql://...
```

### 3. CORS настройки

В backend функциях обновите:
```javascript
'Access-Control-Allow-Origin': 'https://ваш-домен.ru'
```

---

## 🆘 Поддержка

### Если нужна помощь:

1. **Техподдержка Рег.ру**: https://www.reg.ru/support/
2. **Документация poehali.dev**: https://docs.poehali.dev
3. **Контакты разработчика**: указаны в коде проекта

---

## 📝 Чек-лист переноса

- [ ] Код скачан из GitHub
- [ ] Выбран тип хостинга (статический/VPS)
- [ ] Проект собран (`npm run build`)
- [ ] Файлы загружены на сервер
- [ ] База данных настроена
- [ ] Миграции применены
- [ ] Домен подключен
- [ ] DNS записи обновлены
- [ ] SSL сертификат установлен (Let's Encrypt)
- [ ] Данные экспортированы и импортированы
- [ ] Протестированы все функции

---

## 🎯 Рекомендуемый путь

**Для начала:**
1. Используйте статический хостинг Рег.ру
2. Оставьте backend на poehali.dev
3. Подключите свой домен

**Когда проект вырастет:**
1. Перейдите на VPS
2. Перенесите backend и базу данных
3. Получите полный контроль

---

**Удачи с запуском! 🚀**
