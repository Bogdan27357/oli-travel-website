/**
 * Скрипт экспорта данных из базы PostgreSQL
 * Использование: node scripts/export-data.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Конфигурация подключения к БД
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/olitravel';

// Директория для экспорта
const EXPORT_DIR = path.join(__dirname, '../exports');

// Создаем директорию если не существует
if (!fs.existsSync(EXPORT_DIR)) {
  fs.mkdirSync(EXPORT_DIR, { recursive: true });
}

// Таблицы для экспорта
const TABLES = [
  'admins',
  'bookings',
  'chat_messages',
  'chat_sessions',
  'contact_requests',
  'contact_submissions',
  'reviews',
  'tours',
  'users'
];

/**
 * Экспорт данных в JSON
 */
async function exportToJSON() {
  console.log('🚀 Начинаем экспорт данных...\n');
  
  // Для каждой таблицы создаем SQL запрос
  const sqlQueries = TABLES.map(table => ({
    table,
    sql: `SELECT * FROM "${table}";`
  }));

  // Создаем файл с SQL запросами
  const sqlFile = path.join(EXPORT_DIR, 'export-queries.sql');
  const sqlContent = sqlQueries.map(q => `-- ${q.table}\n${q.sql}\n`).join('\n');
  fs.writeFileSync(sqlFile, sqlContent);
  
  console.log('✅ Создан файл с SQL запросами:', sqlFile);
  console.log('\n📋 Инструкция по экспорту:\n');
  console.log('1. Откройте админ-панель poehali.dev');
  console.log('2. Перейдите в раздел "База данных"');
  console.log('3. Выполните следующие SQL запросы и сохраните результаты:\n');
  
  TABLES.forEach(table => {
    console.log(`   SELECT * FROM "${table}";`);
  });
  
  console.log('\n4. Сохраните результаты в формате JSON или CSV');
  console.log('5. Поместите файлы в директорию: exports/\n');

  // Создаем шаблон для JSON данных
  const jsonTemplate = TABLES.reduce((acc, table) => {
    acc[table] = [];
    return acc;
  }, {});

  const templateFile = path.join(EXPORT_DIR, 'data-template.json');
  fs.writeFileSync(templateFile, JSON.stringify(jsonTemplate, null, 2));
  
  console.log('✅ Создан шаблон для данных:', templateFile);
  console.log('\n💡 Заполните этот файл данными из базы\n');
}

/**
 * Генерация SQL бэкапа
 */
function generateBackupSQL() {
  console.log('📦 Генерация SQL бэкапа...\n');
  
  const backupSQL = `
-- ============================================
-- SQL Бэкап базы данных Oli Travel
-- Дата: ${new Date().toISOString()}
-- ============================================

-- Включаем поддержку транзакций
BEGIN;

-- ============================================
-- 1. ADMINS - Администраторы
-- ============================================
-- Вставьте сюда данные из SELECT * FROM admins;
-- Пример: INSERT INTO admins (id, username, password_hash, created_at) VALUES (...);

-- ============================================
-- 2. USERS - Пользователи
-- ============================================
-- Вставьте сюда данные из SELECT * FROM users;

-- ============================================
-- 3. TOURS - Туры
-- ============================================
-- Вставьте сюда данные из SELECT * FROM tours;

-- ============================================
-- 4. BOOKINGS - Бронирования
-- ============================================
-- Вставьте сюда данные из SELECT * FROM bookings;

-- ============================================
-- 5. REVIEWS - Отзывы
-- ============================================
-- Вставьте сюда данные из SELECT * FROM reviews;

-- ============================================
-- 6. CONTACT_REQUESTS - Заявки
-- ============================================
-- Вставьте сюда данные из SELECT * FROM contact_requests;

-- ============================================
-- 7. CONTACT_SUBMISSIONS - Сообщения из форм
-- ============================================
-- Вставьте сюда данные из SELECT * FROM contact_submissions;

-- ============================================
-- 8. CHAT_SESSIONS - Сессии чата
-- ============================================
-- Вставьте сюда данные из SELECT * FROM chat_sessions;

-- ============================================
-- 9. CHAT_MESSAGES - Сообщения чата
-- ============================================
-- Вставьте сюда данные из SELECT * FROM chat_messages;

-- Применяем изменения
COMMIT;

-- ============================================
-- Готово! Бэкап создан успешно
-- ============================================
`;

  const backupFile = path.join(EXPORT_DIR, 'backup-template.sql');
  fs.writeFileSync(backupFile, backupSQL);
  
  console.log('✅ Создан шаблон SQL бэкапа:', backupFile);
  console.log('\n💡 Заполните INSERT команды данными из базы\n');
}

/**
 * Создание скрипта импорта
 */
function createImportScript() {
  const importScript = `#!/bin/bash
# ============================================
# Скрипт импорта данных в PostgreSQL
# Использование: ./scripts/import-data.sh
# ============================================

set -e

echo "🚀 Начинаем импорт данных..."

# Проверка наличия PostgreSQL
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL не установлен"
    exit 1
fi

# Переменные
DB_NAME="\${DB_NAME:-olitravel}"
DB_USER="\${DB_USER:-olitravel_user}"
DB_HOST="\${DB_HOST:-localhost}"
DB_PORT="\${DB_PORT:-5432}"

echo "📊 База данных: \$DB_NAME"
echo "👤 Пользователь: \$DB_USER"
echo "🖥️  Хост: \$DB_HOST:\$DB_PORT"
echo ""

# Создаем базу данных если не существует
echo "📦 Создаем базу данных..."
createdb -h \$DB_HOST -p \$DB_PORT -U \$DB_USER \$DB_NAME 2>/dev/null || echo "База данных уже существует"

# Применяем миграции
echo "🔨 Применяем миграции..."
for migration in db_migrations/*.sql; do
    if [ -f "\$migration" ]; then
        echo "  ➜ Применяем: \$(basename \$migration)"
        psql -h \$DB_HOST -p \$DB_PORT -U \$DB_USER -d \$DB_NAME -f "\$migration"
    fi
done

# Импортируем данные
if [ -f "exports/backup.sql" ]; then
    echo "📥 Импортируем данные..."
    psql -h \$DB_HOST -p \$DB_PORT -U \$DB_USER -d \$DB_NAME -f exports/backup.sql
    echo "✅ Данные импортированы успешно"
else
    echo "⚠️  Файл backup.sql не найден в exports/"
    echo "💡 Создайте файл exports/backup.sql с вашими данными"
fi

echo ""
echo "🎉 Импорт завершен!"
`;

  const scriptFile = path.join(__dirname, 'import-data.sh');
  fs.writeFileSync(scriptFile, importScript);
  fs.chmodSync(scriptFile, '755');
  
  console.log('✅ Создан скрипт импорта:', scriptFile);
  console.log('\n💡 Запустите: ./scripts/import-data.sh\n');
}

// Запускаем экспорт
async function main() {
  console.log('\n' + '='.repeat(50));
  console.log('📦 ЭКСПОРТ ДАННЫХ OLI TRAVEL');
  console.log('='.repeat(50) + '\n');

  await exportToJSON();
  generateBackupSQL();
  createImportScript();

  console.log('='.repeat(50));
  console.log('✅ ВСЕ СКРИПТЫ СОЗДАНЫ');
  console.log('='.repeat(50) + '\n');
  
  console.log('📋 Следующие шаги:\n');
  console.log('1. Экспортируйте данные из админки poehali.dev');
  console.log('2. Заполните файлы в директории exports/');
  console.log('3. Запустите миграции на новом сервере');
  console.log('4. Импортируйте данные через import-data.sh\n');
}

main().catch(console.error);
