#!/bin/bash
# ============================================
# Скрипт настройки SSL сертификатов через Let's Encrypt
# Использование: ./scripts/setup-ssl.sh ваш-домен.ru
# ============================================

set -e

DOMAIN=$1
EMAIL=${2:-"admin@$DOMAIN"}

if [ -z "$DOMAIN" ]; then
    echo "❌ Укажите домен: ./scripts/setup-ssl.sh ваш-домен.ru"
    exit 1
fi

echo "🔐 Настройка SSL для домена: $DOMAIN"
echo "📧 Email: $EMAIL"
echo ""

# Проверка наличия Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker не установлен"
    exit 1
fi

# Создаем временный nginx конфиг для проверки домена
echo "📝 Создаем временную конфигурацию..."

cat > nginx/conf.d/temp-$DOMAIN.conf << EOF
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN www.$DOMAIN;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 200 'OK';
        add_header Content-Type text/plain;
    }
}
EOF

# Перезапускаем nginx
echo "🔄 Перезапускаем nginx..."
docker-compose restart nginx

# Получаем сертификат
echo "🔐 Запрашиваем SSL сертификат..."
docker-compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    -d $DOMAIN \
    -d www.$DOMAIN

# Обновляем nginx конфиг
echo "📝 Обновляем конфигурацию nginx..."
sed -i "s/ваш-домен.ru/$DOMAIN/g" nginx/conf.d/olitravel.conf

# Удаляем временный конфиг
rm nginx/conf.d/temp-$DOMAIN.conf

# Перезапускаем nginx
echo "🔄 Применяем новую конфигурацию..."
docker-compose restart nginx

echo ""
echo "✅ SSL сертификат успешно установлен!"
echo "🌐 Ваш сайт доступен по адресу: https://$DOMAIN"
echo ""
echo "ℹ️  Сертификат будет автоматически обновляться каждые 12 часов"
