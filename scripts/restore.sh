#!/bin/bash
# ============================================
# Скрипт восстановления из резервной копии
# Использование: ./scripts/restore.sh путь-к-бэкапу.sql.gz
# ============================================

set -e

BACKUP_FILE=$1

if [ -z "$BACKUP_FILE" ]; then
    echo "❌ Укажите файл бэкапа:"
    echo "   ./scripts/restore.sh backups/olitravel_backup_20250101_120000.sql.gz"
    exit 1
fi

if [ ! -f "$BACKUP_FILE" ]; then
    echo "❌ Файл не найден: $BACKUP_FILE"
    exit 1
fi

# Загружаем переменные окружения
if [ -f ".env" ]; then
    source .env
fi

DB_NAME=${DB_NAME:-olitravel}
DB_USER=${DB_USER:-olitravel_user}

echo "⚠️  ВНИМАНИЕ: Это удалит все текущие данные!"
echo "База данных: $DB_NAME"
echo "Файл бэкапа: $BACKUP_FILE"
echo ""
read -p "Продолжить? (yes/no): " -r
echo

if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
    echo "❌ Отменено"
    exit 1
fi

echo "🔄 Восстановление из резервной копии..."
echo "=========================================="

# Распаковываем если сжато
if [[ $BACKUP_FILE == *.gz ]]; then
    echo "🗜️  Распаковка архива..."
    TEMP_FILE="${BACKUP_FILE%.gz}"
    gunzip -c "$BACKUP_FILE" > "$TEMP_FILE"
    RESTORE_FILE="$TEMP_FILE"
else
    RESTORE_FILE="$BACKUP_FILE"
fi

# Останавливаем приложение
echo "🛑 Останавливаем приложение..."
docker-compose stop app

# Удаляем текущую базу
echo "🗑️  Удаляем текущую базу данных..."
docker-compose exec -T postgres psql -U $DB_USER -c "DROP DATABASE IF EXISTS $DB_NAME;" postgres
docker-compose exec -T postgres psql -U $DB_USER -c "CREATE DATABASE $DB_NAME;" postgres

# Восстанавливаем данные
echo "📥 Импортируем данные..."
docker-compose exec -T postgres psql -U $DB_USER -d $DB_NAME < "$RESTORE_FILE"

# Удаляем временный файл
if [[ $BACKUP_FILE == *.gz ]]; then
    rm -f "$TEMP_FILE"
fi

# Запускаем приложение
echo "🚀 Запускаем приложение..."
docker-compose start app

echo ""
echo "✅ Восстановление завершено успешно!"
echo "🌐 Приложение снова работает"
