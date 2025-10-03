# 🚀 Быстрый старт - Развертывание на Рег.ру

## 📌 Два пути развертывания

### ✅ Вариант А: Статический хостинг (ПРОЩЕ)
**Время: 10-15 минут**

```bash
# 1. Соберите проект
npm install
npm run build

# 2. Загрузите содержимое папки dist/ на Рег.ру
# Через FTP или файловый менеджер в папку public_html/

# 3. Готово! Сайт работает 🎉
```

**Что работает:**
- ✅ Весь frontend
- ✅ Формы (через poehali.dev backend)
- ⚠️ Backend остается на poehali.dev

---

### ✅ Вариант Б: VPS с Docker (ПОЛНЫЙ КОНТРОЛЬ)
**Время: 30-40 минут**

#### Шаг 1: Подготовка VPS

```bash
# Подключитесь к VPS
ssh root@ваш-ip-адрес

# Установите Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Установите Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

#### Шаг 2: Клонируйте проект

```bash
# Через GitHub
git clone https://github.com/ваш-username/ваш-репозиторий.git
cd ваш-репозиторий

# Или загрузите код через FTP/SCP
```

#### Шаг 3: Настройте окружение

```bash
# Скопируйте пример конфигурации
cp .env.example .env

# Отредактируйте .env
nano .env

# Минимальные настройки:
# - DATABASE_URL (оставьте как есть для Docker)
# - JWT_SECRET (придумайте свой)
# - ADMIN_PASSWORD (измените!)
```

#### Шаг 4: Запустите приложение

```bash
# Сделайте скрипты исполняемыми
chmod +x scripts/*.sh

# Запустите развертывание
./scripts/deploy.sh

# Это автоматически:
# - Соберет Docker образы
# - Запустит PostgreSQL
# - Применит миграции
# - Запустит приложение
```

#### Шаг 5: Настройте SSL

```bash
# Установите SSL сертификат
./scripts/setup-ssl.sh ваш-домен.ru

# Сертификат будет обновляться автоматически
```

#### Шаг 6: Импортируйте данные

```bash
# 1. Экспортируйте данные из poehali.dev
#    (см. exports/backup-template.sql)

# 2. Создайте файл exports/backup.sql с вашими данными

# 3. Импортируйте
./scripts/import-data.sh
```

---

## 📊 Полезные команды

### Управление приложением

```bash
# Просмотр логов
docker-compose logs -f app

# Перезапуск приложения
docker-compose restart app

# Остановка всех сервисов
docker-compose down

# Запуск всех сервисов
docker-compose up -d

# Обновление кода
git pull
./scripts/deploy.sh
```

### Управление базой данных

```bash
# Подключение к БД
docker-compose exec postgres psql -U olitravel_user -d olitravel

# Создание бэкапа
./scripts/backup.sh

# Восстановление из бэкапа
./scripts/restore.sh backups/olitravel_backup_20250101_120000.sql.gz

# Просмотр таблиц
docker-compose exec postgres psql -U olitravel_user -d olitravel -c '\dt'
```

### Мониторинг

```bash
# Статус контейнеров
docker-compose ps

# Использование ресурсов
docker stats

# Логи Nginx
docker-compose logs -f nginx

# Логи БД
docker-compose logs -f postgres
```

---

## 🔧 Решение проблем

### Проблема: Приложение не запускается

```bash
# Проверьте логи
docker-compose logs app

# Проверьте .env файл
cat .env

# Пересоберите образы
docker-compose build --no-cache
docker-compose up -d
```

### Проблема: База данных недоступна

```bash
# Проверьте статус
docker-compose ps postgres

# Проверьте логи
docker-compose logs postgres

# Перезапустите БД
docker-compose restart postgres
```

### Проблема: SSL не работает

```bash
# Проверьте логи Certbot
docker-compose logs certbot

# Проверьте конфигурацию Nginx
docker-compose exec nginx nginx -t

# Переполучите сертификат
./scripts/setup-ssl.sh ваш-домен.ru
```

### Проблема: 502 Bad Gateway

```bash
# Проверьте работу приложения
curl http://localhost:3000

# Проверьте настройки Nginx
docker-compose exec nginx cat /etc/nginx/conf.d/olitravel.conf

# Перезапустите Nginx
docker-compose restart nginx
```

---

## 📁 Структура проекта

```
oli-travel-website/
├── src/                    # Исходный код frontend
├── db_migrations/          # Миграции базы данных
├── scripts/                # Скрипты развертывания
│   ├── deploy.sh          # Основной скрипт развертывания
│   ├── setup-ssl.sh       # Настройка SSL
│   ├── backup.sh          # Резервное копирование
│   ├── restore.sh         # Восстановление
│   └── import-data.sh     # Импорт данных
├── nginx/                  # Конфигурация Nginx
├── exports/                # Экспорт данных
├── backups/                # Резервные копии
├── docker-compose.yml      # Конфигурация Docker
├── Dockerfile              # Образ приложения
├── .env.example            # Пример конфигурации
└── package.json            # Зависимости
```

---

## 🎯 Следующие шаги после развертывания

1. **Проверьте работу сайта**: `https://ваш-домен.ru`
2. **Войдите в админку**: `https://ваш-домен.ru/admin`
3. **Настройте резервное копирование**: Добавьте в cron
4. **Подключите мониторинг**: Настройте Sentry/Метрику
5. **Оптимизируйте**: Включите кэширование Redis

---

## 📞 Поддержка

- **Документация Рег.ру**: https://www.reg.ru/support/
- **Документация Docker**: https://docs.docker.com/
- **PostgreSQL**: https://www.postgresql.org/docs/

---

## 🔄 Автоматизация

### Настройка автоматического бэкапа

```bash
# Добавьте в crontab (crontab -e):
0 3 * * * /path/to/project/scripts/backup.sh

# Бэкап будет создаваться каждый день в 3:00
```

### Автоматическое обновление

```bash
# Добавьте в crontab:
0 4 * * 0 cd /path/to/project && git pull && ./scripts/deploy.sh

# Обновление каждое воскресенье в 4:00
```

---

**Готово! Ваш сайт теперь работает на собственном сервере! 🎉**
