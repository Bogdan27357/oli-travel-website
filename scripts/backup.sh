#!/bin/bash
# ============================================
# Скрипт резервного копирования базы данных
# Использование: ./scripts/backup.sh
# ============================================

set -e

# Загружаем переменные окружения
if [ -f ".env" ]; then
    source .env
fi

DB_NAME=${DB_NAME:-olitravel}
DB_USER=${DB_USER:-olitravel_user}
BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/${DB_NAME}_backup_$TIMESTAMP.sql"

echo "💾 Создание резервной копии базы данных..."
echo "=========================================="
echo "База данных: $DB_NAME"
echo "Пользователь: $DB_USER"
echo "Файл: $BACKUP_FILE"
echo ""

# Создаем директорию для бэкапов
mkdir -p $BACKUP_DIR

# Создаем бэкап
echo "📦 Экспортируем данные..."
docker-compose exec -T postgres pg_dump -U $DB_USER $DB_NAME > $BACKUP_FILE

# Сжимаем бэкап
echo "🗜️  Сжимаем файл..."
gzip $BACKUP_FILE
BACKUP_FILE="${BACKUP_FILE}.gz"

# Получаем размер файла
SIZE=$(du -h "$BACKUP_FILE" | cut -f1)

echo ""
echo "✅ Резервная копия создана успешно!"
echo "📁 Файл: $BACKUP_FILE"
echo "📊 Размер: $SIZE"

# Удаляем старые бэкапы (старше 30 дней)
RETENTION_DAYS=${BACKUP_RETENTION_DAYS:-30}
echo ""
echo "🧹 Удаляем бэкапы старше $RETENTION_DAYS дней..."
find $BACKUP_DIR -name "*.sql.gz" -type f -mtime +$RETENTION_DAYS -delete
echo "✅ Очистка завершена"

# Список всех бэкапов
echo ""
echo "📋 Все резервные копии:"
ls -lh $BACKUP_DIR/*.sql.gz 2>/dev/null || echo "Нет резервных копий"
