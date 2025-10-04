# Настройка базы данных на Рег.ру

## Шаг 1: Создание базы данных PostgreSQL

1. Войдите в панель управления Рег.ру
2. Перейдите в раздел **Базы данных** → **PostgreSQL**
3. Нажмите **Создать базу данных**
4. Задайте параметры:
   - Имя базы данных (например: `olitravel_db`)
   - Пользователь (например: `olitravel_user`)
   - Пароль (сгенерируйте надежный пароль)
5. Сохраните данные подключения

## Шаг 2: Получение данных подключения

После создания БД вы получите:
- **Хост**: `pg-XXXXX.hosting.reg.ru` (адрес сервера)
- **Порт**: `5432` (стандартный порт PostgreSQL)
- **Имя БД**: то, что вы указали при создании
- **Логин**: имя пользователя
- **Пароль**: ваш пароль

## Шаг 3: Настройка секретов в poehali.dev

1. Откройте редактор poehali.dev
2. Перейдите в раздел **Секреты** (кнопка вверху)
3. Заполните следующие секреты:

| Секрет | Значение | Пример |
|--------|----------|--------|
| `REG_DB_HOST` | Хост сервера БД | `pg-12345.hosting.reg.ru` |
| `REG_DB_PORT` | Порт (обычно 5432) | `5432` |
| `REG_DB_NAME` | Имя вашей базы | `olitravel_db` |
| `REG_DB_USER` | Логин пользователя | `olitravel_user` |
| `REG_DB_PASS` | Пароль | `your_strong_password` |

## Шаг 4: Создание таблиц

Подключитесь к БД через phpPgAdmin или любой клиент PostgreSQL и выполните:

```sql
-- Таблица заявок от клиентов
CREATE TABLE IF NOT EXISTS submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT,
    tour_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица туров
CREATE TABLE IF NOT EXISTS tours (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100),
    hotel VARCHAR(255),
    stars INTEGER,
    duration VARCHAR(50),
    dates VARCHAR(100),
    price INTEGER NOT NULL,
    image_url TEXT,
    description TEXT,
    category VARCHAR(50),
    from_spb VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица пользователей
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    full_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица бронирований
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    tour_id INTEGER REFERENCES tours(id),
    status VARCHAR(50) DEFAULT 'pending',
    total_price INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Шаг 5: Использование в frontend

После настройки секретов, используйте функцию `/database` для работы с БД:

```javascript
// Получить список заявок
const response = await fetch('https://functions.poehali.dev/YOUR_FUNCTION_ID?table=submissions&limit=100');
const data = await response.json();

// Создать новую заявку
const response = await fetch('https://functions.poehali.dev/YOUR_FUNCTION_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    table: 'submissions',
    data: {
      name: 'Иван Иванов',
      email: 'ivan@example.com',
      phone: '+79991234567',
      message: 'Интересует тур в Турцию'
    }
  })
});
```

## Готово! 🚀

Теперь ваш сайт может хранить заявки, туры и данные пользователей в вашей базе данных на Рег.ру.
