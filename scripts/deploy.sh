#!/bin/bash
# ============================================
# Скрипт автоматического развертывания на VPS
# Использование: ./scripts/deploy.sh
# ============================================

set -e

echo "🚀 Развертывание Oli Travel на сервере"
echo "=========================================="

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Функция для вывода успеха
success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Функция для вывода ошибки
error() {
    echo -e "${RED}❌ $1${NC}"
    exit 1
}

# Функция для вывода предупреждения
warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Проверка переменных окружения
if [ ! -f ".env" ]; then
    warning "Файл .env не найден, создаем из .env.example"
    cp .env.example .env
    warning "Отредактируйте .env файл и запустите скрипт снова"
    exit 1
fi

# Загружаем переменные
source .env

echo ""
echo "📋 Проверка системных требований..."
echo "--------------------------------------------"

# Проверка Docker
if ! command -v docker &> /dev/null; then
    error "Docker не установлен. Установите Docker: https://docs.docker.com/get-docker/"
fi
success "Docker установлен"

# Проверка Docker Compose
if ! command -v docker-compose &> /dev/null; then
    error "Docker Compose не установлен"
fi
success "Docker Compose установлен"

# Проверка Git
if ! command -v git &> /dev/null; then
    warning "Git не установлен (необязательно)"
else
    success "Git установлен"
fi

echo ""
echo "🛠️  Подготовка к развертыванию..."
echo "--------------------------------------------"

# Создаем необходимые директории
mkdir -p nginx/conf.d
mkdir -p certbot/conf
mkdir -p certbot/www
mkdir -p public/uploads
mkdir -p exports
mkdir -p backups

success "Директории созданы"

# Останавливаем старые контейнеры
echo ""
echo "🛑 Останавливаем старые контейнеры..."
docker-compose down 2>/dev/null || true
success "Старые контейнеры остановлены"

# Собираем новые образы
echo ""
echo "🔨 Собираем Docker образы..."
docker-compose build --no-cache
success "Образы собраны"

# Запускаем контейнеры
echo ""
echo "🚀 Запускаем контейнеры..."
docker-compose up -d
success "Контейнеры запущены"

# Ждем пока база данных будет готова
echo ""
echo "⏳ Ожидание готовности базы данных..."
sleep 10

# Проверяем статус контейнеров
echo ""
echo "📊 Статус контейнеров:"
echo "--------------------------------------------"
docker-compose ps

# Применяем миграции
echo ""
echo "🔨 Применяем миграции базы данных..."
if [ -d "db_migrations" ]; then
    for migration in db_migrations/*.sql; do
        if [ -f "$migration" ]; then
            echo "  ➜ Применяем: $(basename $migration)"
            docker-compose exec -T postgres psql -U ${DB_USER:-olitravel_user} -d ${DB_NAME:-olitravel} < "$migration" || warning "Миграция уже применена или ошибка"
        fi
    done
    success "Миграции применены"
else
    warning "Директория db_migrations не найдена"
fi

# Проверка здоровья
echo ""
echo "🏥 Проверка работоспособности..."
echo "--------------------------------------------"

sleep 5

# Проверка приложения
if curl -f http://localhost:${PORT:-3000} > /dev/null 2>&1; then
    success "Приложение работает на порту ${PORT:-3000}"
else
    error "Приложение не отвечает"
fi

# Проверка базы данных
if docker-compose exec -T postgres pg_isready -U ${DB_USER:-olitravel_user} > /dev/null 2>&1; then
    success "База данных работает"
else
    error "База данных не отвечает"
fi

echo ""
echo "=========================================="
echo -e "${GREEN}🎉 Развертывание завершено успешно!${NC}"
echo "=========================================="
echo ""
echo "📝 Следующие шаги:"
echo "1. Настройте SSL сертификаты: ./scripts/setup-ssl.sh"
echo "2. Проверьте приложение: http://localhost:${PORT:-3000}"
echo "3. Настройте домен в nginx/conf.d/olitravel.conf"
echo "4. Импортируйте данные: ./scripts/import-data.sh"
echo ""
echo "📊 Полезные команды:"
echo "  - Просмотр логов: docker-compose logs -f"
echo "  - Перезапуск: docker-compose restart"
echo "  - Остановка: docker-compose down"
echo "  - Обновление: git pull && ./scripts/deploy.sh"
echo ""
