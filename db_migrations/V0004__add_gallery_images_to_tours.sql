-- Добавление поля gallery_images для хранения множественных фотографий к турам
ALTER TABLE t_p56383043_oli_travel_website.tours 
ADD COLUMN IF NOT EXISTS gallery_images TEXT[];

-- Комментарий для поля
COMMENT ON COLUMN t_p56383043_oli_travel_website.tours.gallery_images IS 'Массив URL дополнительных фотографий тура (отель, номера, пляж, бассейн и т.д.)';