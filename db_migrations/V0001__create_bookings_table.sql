CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    tour_title VARCHAR(255) NOT NULL,
    hotel VARCHAR(255) NOT NULL,
    duration VARCHAR(100) NOT NULL,
    dates VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_phone VARCHAR(50) NOT NULL,
    adults INTEGER DEFAULT 1,
    children INTEGER DEFAULT 0,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'new'
);

CREATE INDEX idx_bookings_created_at ON bookings(created_at);
CREATE INDEX idx_bookings_status ON bookings(status);