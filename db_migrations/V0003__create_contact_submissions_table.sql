-- Создание таблицы для хранения заявок с контактной формы
CREATE TABLE IF NOT EXISTS t_p56383043_oli_travel_website.contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для быстрого поиска
CREATE INDEX idx_contact_status ON t_p56383043_oli_travel_website.contact_submissions(status);
CREATE INDEX idx_contact_created ON t_p56383043_oli_travel_website.contact_submissions(created_at DESC);
