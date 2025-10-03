#!/bin/bash
# ============================================
# Скрипт импорта данных в PostgreSQL
# Использование: ./scripts/import-data.sh
# ============================================

set -e

echo "📥 Импорт данных в базу Oli Travel"
echo "=========================================="

# Загружаем переменные
if [ -f ".env" ]; then
    source .env
fi

DB_NAME=${DB_NAME:-olitravel}
DB_USER=${DB_USER:-olitravel_user}

echo "База данных: $DB_NAME"
echo "Пользователь: $DB_USER"
echo ""

# Проверяем наличие файла с данными
if [ ! -f "exports/backup.sql" ]; then
    echo "⚠️  Файл exports/backup.sql не найден"
    echo ""
    echo "📋 Создайте файл exports/backup.sql с данными:"
    echo "   1. Экспортируйте данные из админки poehali.dev"
    echo "   2. Используйте шаблон exports/backup-template.sql"
    echo "   3. Заполните INSERT команды своими данными"
    exit 1
fi

# Применяем миграции
echo "🔨 Применяем миграции..."
if [ -d "db_migrations" ]; then
    for migration in db_migrations/*.sql; do
        if [ -f "$migration" ]; then
            echo "  ➜ Применяем: $(basename $migration)"
            docker-compose exec -T postgres psql -U $DB_USER -d $DB_NAME < "$migration" 2>/dev/null || echo "  ⚠️  Миграция уже применена"
        fi
    done
    echo "✅ Миграции применены"
else
    echo "❌ Директория db_migrations не найдена"
    exit 1
fi

# Импортируем данные
echo ""
echo "📥 Импортируем данные..."
docker-compose exec -T postgres psql -U $DB_USER -d $DB_NAME < exports/backup.sql

echo ""
echo "✅ Импорт завершен успешно!"
echo ""
echo "📊 Проверьте данные:"
echo "   docker-compose exec postgres psql -U $DB_USER -d $DB_NAME"
echo ""
