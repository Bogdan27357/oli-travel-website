import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const hotels = [
  // Турция
  { id: 1, name: 'Rixos Premium Belek', location: 'Турция, Белек', rating: 5, price: 45000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', features: ['Все включено', 'Собственный пляж', 'SPA'] },
  { id: 2, name: 'Maxx Royal Belek', location: 'Турция, Белек', rating: 5, price: 55000, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', features: ['Ультра все включено', 'Аквапарк', 'Детский клуб'] },
  { id: 3, name: 'Regnum Carya', location: 'Турция, Белек', rating: 5, price: 48000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', features: ['Гольф', 'SPA центр', '7 ресторанов'] },
  { id: 4, name: 'Titanic Deluxe', location: 'Турция, Белек', rating: 5, price: 42000, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', features: ['Аквапарк', 'Анимация', 'Теннис'] },
  { id: 5, name: 'Delphin Palace', location: 'Турция, Анталия', rating: 5, price: 40000, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', features: ['Все включено', 'Аквапарк', 'Дискотека'] },
  { id: 6, name: 'Voyage Belek', location: 'Турция, Белек', rating: 5, price: 50000, image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', features: ['Гольф', 'SPA', 'Водные горки'] },
  { id: 7, name: 'Adam & Eve', location: 'Турция, Белек', rating: 5, price: 47000, image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800', features: ['Только взрослые', 'Романтик', 'SPA'] },
  { id: 8, name: 'IC Santai', location: 'Турция, Белек', rating: 5, price: 44000, image: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800', features: ['Семейный', 'Все включено', 'Детский клуб'] },
  { id: 49, name: 'Gloria Serenity Resort', location: 'Турция, Белек', rating: 5, price: 46000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', features: ['Гольф', 'SPA', 'Теннис'] },
  { id: 50, name: 'Susesi Luxury Resort', location: 'Турция, Белек', rating: 5, price: 49000, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', features: ['Аквапарк', 'Все включено', 'Анимация'] },
  { id: 51, name: 'Liberty Hotels Lara', location: 'Турция, Анталия', rating: 5, price: 43000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', features: ['Тематический', 'Аквапарк', 'Детский клуб'] },
  { id: 52, name: 'Kaya Palazzo', location: 'Турция, Белек', rating: 5, price: 51000, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', features: ['Ультра все включено', 'SPA', 'Гольф'] },
  { id: 53, name: 'Papillon Belvil', location: 'Турция, Белек', rating: 5, price: 41000, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', features: ['Все включено', 'Пляж', 'Анимация'] },
  { id: 54, name: 'Cornelia Diamond', location: 'Турция, Белек', rating: 5, price: 53000, image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', features: ['Гольф', 'Аквапарк', 'SPA'] },
  { id: 55, name: 'Miracle Resort', location: 'Турция, Анталия', rating: 5, price: 39000, image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800', features: ['Все включено', 'Пляж', 'Детский клуб'] },
  { id: 56, name: 'Ela Quality Resort', location: 'Турция, Белек', rating: 5, price: 44500, image: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800', features: ['Семейный', 'SPA', 'Аквапарк'] },
  { id: 57, name: 'Nirvana Lagoon', location: 'Турция, Кемер', rating: 5, price: 47500, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', features: ['Виллы', 'Лагуна', 'SPA'] },
  { id: 58, name: 'Crystal Sunset', location: 'Турция, Сиде', rating: 5, price: 42500, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', features: ['Все включено', 'Пляж', 'Анимация'] },
  { id: 137, name: 'Calista Luxury Resort', location: 'Турция, Белек', rating: 5, price: 54000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', features: ['Ультра все включено', 'Аквапарк', 'SPA'] },
  { id: 138, name: 'Spice Hotel Belek', location: 'Турция, Белек', rating: 5, price: 46500, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', features: ['Все включено', 'Пляж', 'Детский клуб'] },
  { id: 139, name: 'Bellis Deluxe', location: 'Турция, Белек', rating: 5, price: 48500, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', features: ['Роскошь', 'SPA', 'Гольф'] },
  { id: 140, name: 'Xanadu Resort', location: 'Турция, Белек', rating: 5, price: 52500, image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', features: ['Аквапарк', 'Все включено', 'Анимация'] },
  { id: 146, name: 'Granada Luxury', location: 'Турция, Белек', rating: 5, price: 50000, image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800', features: ['Ультра все включено', 'SPA', 'Аквапарк'] },
  { id: 147, name: 'Selectum Family Resort', location: 'Турция, Белек', rating: 5, price: 47000, image: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800', features: ['Семейный', 'Все включено', 'Детский клуб'] },
  { id: 148, name: 'Sueno Hotels Deluxe', location: 'Турция, Белек', rating: 5, price: 51000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', features: ['Роскошь', 'Гольф', 'SPA'] },
  { id: 149, name: 'TUI Magic Life Waterworld', location: 'Турция, Белек', rating: 5, price: 45000, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', features: ['Аквапарк', 'Все включено', 'Анимация'] },
  { id: 150, name: 'Concorde De Luxe Resort', location: 'Турция, Анталия', rating: 5, price: 48000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', features: ['Все включено', 'Пляж', 'SPA'] },
  
  // ОАЭ
  { id: 9, name: 'Atlantis The Palm', location: 'ОАЭ, Дубай', rating: 5, price: 85000, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800', features: ['Аквапарк', 'Океанариум', 'Дельфинарий'] },
  { id: 10, name: 'Burj Al Arab', location: 'ОАЭ, Дубай', rating: 5, price: 150000, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800', features: ['7 звезд', 'Люкс', 'Вертолет'] },
  { id: 11, name: 'Jumeirah Beach Hotel', location: 'ОАЭ, Дубай', rating: 5, price: 75000, image: 'https://images.unsplash.com/photo-1549294413-26f195200c16?w=800', features: ['Пляж', 'Аквапарк', 'Вид на Burj'] },
  { id: 12, name: 'Rixos Premium Dubai', location: 'ОАЭ, Дубай', rating: 5, price: 70000, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', features: ['Все включено', 'JBR пляж', 'Детский клуб'] },
  { id: 13, name: 'Waldorf Astoria', location: 'ОАЭ, Дубай', rating: 5, price: 95000, image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800', features: ['Роскошь', 'SPA', 'Michelin рестораны'] },
  { id: 14, name: 'Sheraton Jumeirah', location: 'ОАЭ, Дубай', rating: 5, price: 65000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', features: ['Пляж', 'Бассейн', 'Фитнес'] },
  { id: 59, name: 'One&Only Royal Mirage', location: 'ОАЭ, Дубай', rating: 5, price: 105000, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', features: ['Роскошь', 'Пляж', 'SPA'] },
  { id: 60, name: 'Kempinski Palm', location: 'ОАЭ, Дубай', rating: 5, price: 88000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', features: ['Пальма Джумейра', 'Виллы', 'SPA'] },
  { id: 61, name: 'Fairmont The Palm', location: 'ОАЭ, Дубай', rating: 5, price: 78000, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', features: ['Пляж', 'Бассейн', 'Фитнес'] },
  { id: 62, name: 'Sofitel The Palm', location: 'ОАЭ, Дубай', rating: 5, price: 72000, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', features: ['Французская роскошь', 'SPA', 'Рестораны'] },
  { id: 63, name: 'Anantara The Palm', location: 'ОАЭ, Дубай', rating: 5, price: 92000, image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', features: ['Виллы', 'SPA', 'Пляж'] },
  { id: 64, name: 'Park Hyatt Dubai', location: 'ОАЭ, Дубай', rating: 5, price: 82000, image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800', features: ['Яхт-клуб', 'SPA', 'Гольф'] },
  { id: 65, name: 'Al Maha Desert', location: 'ОАЭ, Дубай', rating: 5, price: 135000, image: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800', features: ['Пустыня', 'Виллы', 'Сафари'] },
  { id: 66, name: 'JA Beach Hotel', location: 'ОАЭ, Дубай', rating: 5, price: 68000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', features: ['Пляж', 'Аквапарк', 'Семейный'] },
  { id: 67, name: 'The Palace Downtown', location: 'ОАЭ, Дубай', rating: 5, price: 98000, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', features: ['Вид на Burj', 'Роскошь', 'SPA'] },
  { id: 68, name: 'Address Boulevard', location: 'ОАЭ, Дубай', rating: 5, price: 85000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', features: ['Центр города', 'Вид на фонтаны', 'SPA'] },
  { id: 151, name: 'Caesars Palace Bluewaters', location: 'ОАЭ, Дубай', rating: 5, price: 112000, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', features: ['Роскошь', 'Остров', 'Казино'] },
  { id: 152, name: 'Le Royal Meridien', location: 'ОАЭ, Дубай', rating: 5, price: 78000, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', features: ['JBR пляж', 'Бассейны', 'SPA'] },
  { id: 153, name: 'Jumeirah Al Qasr', location: 'ОАЭ, Дубай', rating: 5, price: 125000, image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', features: ['Роскошь', 'Арабский стиль', 'Пляж'] },
  { id: 154, name: 'Palazzo Versace Dubai', location: 'ОАЭ, Дубай', rating: 5, price: 118000, image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800', features: ['Версаче', 'Роскошь', 'SPA'] },
  
  // Таиланд
  { id: 15, name: 'The Slate Phuket', location: 'Таиланд, Пхукет', rating: 5, price: 58000, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', features: ['Бутик', 'SPA', 'Тайский массаж'] },
  { id: 16, name: 'Anantara Phuket', location: 'Таиланд, Пхукет', rating: 5, price: 62000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', features: ['Виллы', 'Приватный пляж', 'SPA'] },
  { id: 17, name: 'Centara Grand Phuket', location: 'Таиланд, Пхукет', rating: 5, price: 52000, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', features: ['Аквапарк', 'Семейный', 'Анимация'] },
  { id: 18, name: 'Dusit Thani Pattaya', location: 'Таиланд, Паттайя', rating: 5, price: 48000, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', features: ['Центр города', 'Пляж', 'SPA'] },
  { id: 19, name: 'Amari Pattaya', location: 'Таиланд, Паттайя', rating: 5, price: 45000, image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', features: ['Набережная', 'Бассейн', 'Массаж'] },
  { id: 20, name: 'InterContinental Samui', location: 'Таиланд, Самуи', rating: 5, price: 68000, image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800', features: ['Виллы', 'Тропический сад', 'SPA'] },
  { id: 69, name: 'Four Seasons Bangkok', location: 'Таиланд, Бангкок', rating: 5, price: 72000, image: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800', features: ['Центр города', 'SPA', 'Michelin рестораны'] },
  { id: 70, name: 'Banyan Tree Phuket', location: 'Таиланд, Пхукет', rating: 5, price: 75000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', features: ['Виллы с бассейном', 'SPA', 'Гольф'] },
  { id: 71, name: 'Six Senses Yao Noi', location: 'Таиланд, Яо Ной', rating: 5, price: 95000, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', features: ['Приватный остров', 'Эко', 'SPA'] },
  { id: 72, name: 'Anantara Riverside', location: 'Таиланд, Бангкок', rating: 5, price: 55000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', features: ['Река', 'SPA', 'Бассейны'] },
  { id: 73, name: 'Marriott Pattaya', location: 'Таиланд, Паттайя', rating: 5, price: 47000, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', features: ['Набережная', 'Бассейн', 'Фитнес'] },
  { id: 74, name: 'Hilton Pattaya', location: 'Таиланд, Паттайя', rating: 5, price: 46000, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', features: ['Торговый центр', 'Пляж', 'SPA'] },
  { id: 75, name: 'W Retreat Koh Samui', location: 'Таиланд, Самуи', rating: 5, price: 82000, image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', features: ['Модерн', 'Виллы', 'SPA'] },
  { id: 76, name: 'Rayavadee Krabi', location: 'Таиланд, Краби', rating: 5, price: 88000, image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800', features: ['Павильоны', 'Пляж', 'SPA'] },
  { id: 77, name: 'Trisara Phuket', location: 'Таиланд, Пхукет', rating: 5, price: 98000, image: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800', features: ['Виллы', 'Приватный пляж', 'SPA'] },
  { id: 78, name: 'Renaissance Pattaya', location: 'Таиланд, Паттайя', rating: 5, price: 49000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', features: ['Океан', 'Бассейн', 'Фитнес'] },
  { id: 155, name: 'Amari Pattaya', location: 'Таиланд, Паттайя', rating: 5, price: 46000, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', features: ['Набережная', 'SPA', 'Бассейн'] },
  { id: 156, name: 'Cape Panwa Hotel Phuket', location: 'Таиланд, Пхукет', rating: 5, price: 65000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', features: ['Приватный пляж', 'Виллы', 'SPA'] },
  { id: 157, name: 'Angsana Laguna Phuket', location: 'Таиланд, Пхукет', rating: 5, price: 58000, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', features: ['Лагуна', 'Семейный', 'SPA'] },
  { id: 158, name: 'Conrad Koh Samui', location: 'Таиланд, Самуи', rating: 5, price: 92000, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', features: ['Виллы', 'Infinity pool', 'Роскошь'] },
  
  // Египет
  { id: 21, name: 'Rixos Sharm El Sheikh', location: 'Египет, Шарм-эль-Шейх', rating: 5, price: 38000, image: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800', features: ['Все включено', 'Коралловый риф', 'Аквапарк'] },
  { id: 22, name: 'Baron Palace', location: 'Египет, Хургада', rating: 5, price: 35000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', features: ['Дворец', 'SPA', 'Собственный пляж'] },
  { id: 23, name: 'Steigenberger Al Dau', location: 'Египет, Хургада', rating: 5, price: 40000, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', features: ['Снорклинг', 'Дайвинг', 'Аквапарк'] },
  { id: 24, name: 'Albatros Palace', location: 'Египет, Хургада', rating: 5, price: 36000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', features: ['Все включено', 'Аквапарк', 'Анимация'] },
  { id: 25, name: 'Savoy Sharm', location: 'Египет, Шарм-эль-Шейх', rating: 5, price: 42000, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', features: ['Наама Бей', 'Риф', 'SPA'] },
  { id: 79, name: 'Four Seasons Sharm', location: 'Египет, Шарм-эль-Шейх', rating: 5, price: 58000, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', features: ['Роскошь', 'Коралловый риф', 'SPA'] },
  { id: 80, name: 'Kempinski Soma Bay', location: 'Египет, Сома Бей', rating: 5, price: 48000, image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', features: ['Гольф', 'Кайтсерфинг', 'SPA'] },
  { id: 81, name: 'Jaz Mirabel Beach', location: 'Египет, Шарм-эль-Шейх', rating: 5, price: 37000, image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800', features: ['Все включено', 'Аквапарк', 'Риф'] },
  { id: 82, name: 'Cleopatra Luxury Makadi', location: 'Египет, Макади Бей', rating: 5, price: 39000, image: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800', features: ['Все включено', 'Пляж', 'Анимация'] },
  { id: 83, name: 'Premier Le Reve', location: 'Египет, Сахл Хашиш', rating: 5, price: 44000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', features: ['Только взрослые', 'Роскошь', 'SPA'] },
  { id: 84, name: 'Rixos Premium Magawish', location: 'Египет, Хургада', rating: 5, price: 41000, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', features: ['Все включено', 'Аквапарк', 'Детский клуб'] },
  { id: 85, name: 'Sahl Hasheesh Bay', location: 'Египет, Сахл Хашиш', rating: 5, price: 46000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', features: ['Лагуна', 'Бассейны', 'SPA'] },
  { id: 86, name: 'Stella Di Mare', location: 'Египет, Шарм-эль-Шейх', rating: 5, price: 40000, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', features: ['Все включено', 'Гольф', 'SPA'] },
  { id: 87, name: 'Grand Rotana Resort', location: 'Египет, Шарм-эль-Шейх', rating: 5, price: 43000, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', features: ['Все включено', 'Пляж', 'Дайвинг'] },
  { id: 88, name: 'Hurghada Marriott', location: 'Египет, Хургада', rating: 5, price: 38500, image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', features: ['Пляж', 'Бассейн', 'Фитнес'] },
  { id: 141, name: 'Pickalbatros Aqua Park', location: 'Египет, Хургада', rating: 5, price: 37500, image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800', features: ['Аквапарк', 'Все включено', 'Семейный'] },
  { id: 142, name: 'Coral Beach Hurghada', location: 'Египет, Хургада', rating: 5, price: 39500, image: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800', features: ['Коралловый риф', 'Дайвинг', 'SPA'] },
  { id: 143, name: 'Amwaj Blue Beach', location: 'Египет, Сома Бей', rating: 5, price: 42500, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', features: ['Все включено', 'Пляж', 'Кайтсерфинг'] },
  
  // Мальдивы
  { id: 26, name: 'Conrad Maldives', location: 'Мальдивы, Рангали', rating: 5, price: 180000, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', features: ['Водные виллы', 'Подводный ресторан', 'SPA'] },
  { id: 27, name: 'Anantara Dhigu', location: 'Мальдивы, Атолл Мале', rating: 5, price: 150000, image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', features: ['Бунгало', 'Дайвинг', 'Романтик'] },
  { id: 28, name: 'Sun Siyam Iru Fushi', location: 'Мальдивы, Ноону', rating: 5, price: 165000, image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800', features: ['Приватный остров', 'SPA', 'Снорклинг'] },
  { id: 29, name: 'Kurumba Maldives', location: 'Мальдивы, Атолл Мале', rating: 5, price: 145000, image: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800', features: ['Близко к аэропорту', 'Виллы', 'Дайвинг'] },
  { id: 30, name: 'Velassaru Maldives', location: 'Мальдивы, Южный Мале', rating: 5, price: 155000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', features: ['Романтик', 'Водные виллы', 'SPA'] },
  { id: 89, name: 'Baros Maldives', location: 'Мальдивы, Северный Мале', rating: 5, price: 168000, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', features: ['Романтик', 'Подводный ресторан', 'SPA'] },
  { id: 90, name: 'Lily Beach Resort', location: 'Мальдивы, Ари Атолл', rating: 5, price: 142000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', features: ['Все включено', 'Домашний риф', 'SPA'] },
  { id: 91, name: 'Centara Ras Fushi', location: 'Мальдивы, Северный Мале', rating: 5, price: 138000, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', features: ['Все включено', 'Только взрослые', 'Снорклинг'] },
  { id: 92, name: 'COMO Cocoa Island', location: 'Мальдивы, Южный Мале', rating: 5, price: 175000, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', features: ['Роскошь', 'Йога', 'SPA'] },
  { id: 93, name: 'Milaidhoo Island', location: 'Мальдивы, Баа Атолл', rating: 5, price: 195000, image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', features: ['Только взрослые', 'Бутик', 'Рестораны'] },
  { id: 94, name: 'Joali Maldives', location: 'Мальдивы, Раа Атолл', rating: 5, price: 210000, image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800', features: ['Арт-резорт', 'Виллы', 'SPA'] },
  { id: 95, name: 'Park Hyatt Hadahaa', location: 'Мальдивы, Гааф Алиф', rating: 5, price: 158000, image: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800', features: ['Уединение', 'Виллы', 'Дайвинг'] },
  { id: 96, name: 'Vakkaru Maldives', location: 'Мальдивы, Баа Атолл', rating: 5, price: 188000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', features: ['Роскошь', 'Водные виллы', 'SPA'] },
  { id: 97, name: 'SAii Lagoon Maldives', location: 'Мальдивы, Эмбуду Финолу', rating: 5, price: 125000, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', features: ['Близко к Мале', 'Модерн', 'Бассейны'] },
  { id: 144, name: 'Heritance Aarah', location: 'Мальдивы, Раа Атолл', rating: 5, price: 172000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', features: ['Роскошь', 'Подводная вилла', 'SPA'] },
  { id: 145, name: 'Oblu Select Sangeli', location: 'Мальдивы, Северный Мале', rating: 5, price: 135000, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', features: ['Все включено', 'Риф', 'Дайвинг'] },
  { id: 159, name: 'Cocoon Maldives', location: 'Мальдивы, Лавияни Атолл', rating: 5, price: 165000, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', features: ['Модерн', 'Водные виллы', 'SPA'] },
  { id: 160, name: 'Finolhu Baa Atoll', location: 'Мальдивы, Баа Атолл', rating: 5, price: 178000, image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', features: ['Ретро-роскошь', 'Пляж-клуб', 'SPA'] },
  { id: 161, name: 'Kuramathi Island', location: 'Мальдивы, Расду Атолл', rating: 5, price: 148000, image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800', features: ['Большой остров', 'Все включено', 'Дайвинг'] },
  
  // Вьетнам
  { id: 31, name: 'Vinpearl Nha Trang', location: 'Вьетнам, Нячанг', rating: 5, price: 48000, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', features: ['Остров', 'Аквапарк', 'Канатная дорога'] },
  { id: 32, name: 'InterContinental Danang', location: 'Вьетнам, Дананг', rating: 5, price: 52000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', features: ['Пляж', 'SPA', 'Семейный'] },
  { id: 33, name: 'Sheraton Nha Trang', location: 'Вьетнам, Нячанг', rating: 5, price: 45000, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', features: ['Центр города', 'Бассейн', 'Фитнес'] },
  { id: 34, name: 'Furama Resort Danang', location: 'Вьетнам, Дананг', rating: 5, price: 50000, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', features: ['Пляж', 'Гольф', 'SPA'] },
  { id: 98, name: 'JW Marriott Phu Quoc', location: 'Вьетнам, Фукуок', rating: 5, price: 68000, image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', features: ['Остров', 'Бассейн', 'SPA'] },
  { id: 99, name: 'Six Senses Con Dao', location: 'Вьетнам, Кондао', rating: 5, price: 95000, image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800', features: ['Виллы', 'Уединение', 'Эко'] },
  { id: 100, name: 'Mia Resort Nha Trang', location: 'Вьетнам, Нячанг', rating: 5, price: 42000, image: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800', features: ['Бутик', 'Пляж', 'SPA'] },
  { id: 101, name: 'Anantara Hoi An', location: 'Вьетнам, Хойан', rating: 5, price: 54000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', features: ['Река', 'SPA', 'Культура'] },
  { id: 102, name: 'Fusion Resort Phu Quoc', location: 'Вьетнам, Фукуок', rating: 5, price: 58000, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', features: ['Все включено SPA', 'Пляж', 'Велнес'] },
  { id: 103, name: 'Hyatt Regency Danang', location: 'Вьетнам, Дананг', rating: 5, price: 51000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', features: ['Пляж', 'Бассейн', 'Фитнес'] },
  { id: 104, name: 'Pullman Danang', location: 'Вьетнам, Дананг', rating: 5, price: 49000, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', features: ['Пляж', 'Французский стиль', 'SPA'] },
  { id: 162, name: 'Premier Village Phu Quoc', location: 'Вьетнам, Фукуок', rating: 5, price: 72000, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', features: ['Виллы', 'Остров', 'Семейный'] },
  { id: 163, name: 'Anam QT Resort Cam Ranh', location: 'Вьетнам, Камрань', rating: 5, price: 55000, image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', features: ['Индокитайский стиль', 'Пляж', 'SPA'] },
  { id: 164, name: 'La Vela Saigon', location: 'Вьетнам, Хошимин', rating: 5, price: 48000, image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800', features: ['Город', 'Бассейн на крыше', 'Рестораны'] },
  
  // Шри-Ланка
  { id: 35, name: 'Heritance Kandalama', location: 'Шри-Ланка, Дамбулла', rating: 5, price: 55000, image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', features: ['Эко-отель', 'Озеро', 'SPA'] },
  { id: 36, name: 'Jetwing Lighthouse', location: 'Шри-Ланка, Галле', rating: 5, price: 48000, image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800', features: ['Океан', 'Infinity pool', 'Массаж'] },
  { id: 37, name: 'Anantara Peace Haven', location: 'Шри-Ланка, Тангалле', rating: 5, price: 62000, image: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800', features: ['Виллы', 'Приватный пляж', 'SPA'] },
  { id: 105, name: 'Shangri-La Hambantota', location: 'Шри-Ланка, Хамбантота', rating: 5, price: 58000, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', features: ['Гольф', 'SPA', 'Природа'] },
  { id: 106, name: 'Cinnamon Grand Colombo', location: 'Шри-Ланка, Коломбо', rating: 5, price: 42000, image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', features: ['Город', 'Бассейн', 'Рестораны'] },
  { id: 107, name: 'Cape Weligama', location: 'Шри-Ланка, Велигама', rating: 5, price: 72000, image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800', features: ['Виллы с бассейном', 'Океан', 'Серфинг'] },
  { id: 108, name: 'Amangalla Galle', location: 'Шри-Ланка, Галле', rating: 5, price: 95000, image: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800', features: ['Колониальный', 'SPA', 'История'] },
  { id: 109, name: 'The Fortress', location: 'Шри-Ланка, Косгода', rating: 5, price: 68000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', features: ['Роскошь', 'Океан', 'SPA'] },
  { id: 165, name: 'Anantara Kalutara', location: 'Шри-Ланка, Калутара', rating: 5, price: 58000, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', features: ['Пляж', 'SPA', 'Аюрведа'] },
  { id: 166, name: 'Cinnamon Bey Beruwala', location: 'Шри-Ланка, Берувела', rating: 5, price: 52000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', features: ['Пляж', 'Все включено', 'SPA'] },
  
  // Индонезия (Бали)
  { id: 38, name: 'AYANA Resort Bali', location: 'Индонезия, Бали', rating: 5, price: 68000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', features: ['Rock Bar', 'SPA', 'Виллы'] },
  { id: 39, name: 'Padma Resort Ubud', location: 'Индонезия, Убуд', rating: 5, price: 58000, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', features: ['Джунгли', 'Infinity pool', 'SPA'] },
  { id: 40, name: 'St. Regis Bali', location: 'Индонезия, Нуса Дуа', rating: 5, price: 95000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', features: ['Роскошь', 'Виллы', 'Butler service'] },
  { id: 110, name: 'Four Seasons Jimbaran', location: 'Индонезия, Джимбаран', rating: 5, price: 88000, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', features: ['Виллы', 'Пляж', 'SPA'] },
  { id: 111, name: 'Mulia Resort Nusa Dua', location: 'Индонезия, Нуса Дуа', rating: 5, price: 72000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', features: ['Бассейны', 'SPA', 'Пляж'] },
  { id: 112, name: 'The Legian Seminyak', location: 'Индонезия, Семиньяк', rating: 5, price: 78000, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', features: ['Пляж', 'Сансет', 'SPA'] },
  { id: 113, name: 'Alila Uluwatu', location: 'Индонезия, Улувату', rating: 5, price: 82000, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', features: ['Скалы', 'Infinity pool', 'Модерн'] },
  { id: 114, name: 'Bulgari Resort Bali', location: 'Индонезия, Улувату', rating: 5, price: 125000, image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', features: ['Роскошь', 'Виллы', 'Итальянский стиль'] },
  { id: 115, name: 'Karma Kandara', location: 'Индонезия, Унгасан', rating: 5, price: 75000, image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800', features: ['Виллы', 'Пляжный клуб', 'SPA'] },
  { id: 116, name: 'Grand Hyatt Bali', location: 'Индонезия, Нуса Дуа', rating: 5, price: 65000, image: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800', features: ['Сады', 'Бассейны', 'Пляж'] },
  { id: 167, name: 'Viceroy Bali', location: 'Индонезия, Убуд', rating: 5, price: 88000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', features: ['Виллы', 'Джунгли', 'SPA'] },
  { id: 168, name: 'W Bali Seminyak', location: 'Индонезия, Семиньяк', rating: 5, price: 82000, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', features: ['Модерн', 'Пляж', 'Клубная жизнь'] },
  { id: 169, name: 'Sofitel Bali Nusa Dua', location: 'Индонезия, Нуса Дуа', rating: 5, price: 68000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', features: ['Французская роскошь', 'Пляж', 'SPA'] },
  
  // Марокко
  { id: 41, name: 'La Mamounia', location: 'Марокко, Марракеш', rating: 5, price: 75000, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', features: ['Дворец', 'Сады', 'SPA'] },
  { id: 42, name: 'Royal Mansour', location: 'Марокко, Марракеш', rating: 5, price: 120000, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', features: ['Риады', 'Роскошь', 'SPA'] },
  { id: 117, name: 'Mazagan Beach Resort', location: 'Марокко, Эль-Джадида', rating: 5, price: 62000, image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', features: ['Океан', 'Гольф', 'Казино'] },
  { id: 118, name: 'Sofitel Agadir', location: 'Марокко, Агадир', rating: 5, price: 58000, image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800', features: ['Пляж', 'Талассо SPA', 'Бассейн'] },
  { id: 119, name: 'Four Seasons Marrakech', location: 'Марокко, Марракеш', rating: 5, price: 95000, image: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800', features: ['Сады', 'SPA', 'Роскошь'] },
  { id: 120, name: 'Fairmont Taghazout', location: 'Марокко, Тагазут', rating: 5, price: 68000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', features: ['Серфинг', 'SPA', 'Океан'] },
  { id: 121, name: 'Mandarin Oriental Marrakech', location: 'Марокко, Марракеш', rating: 5, price: 105000, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', features: ['Виллы', 'SPA', 'Рестораны'] },
  { id: 170, name: 'Banyan Tree Tamouda Bay', location: 'Марокко, Тамуда Бэй', rating: 5, price: 85000, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', features: ['Виллы', 'Пляж', 'SPA'] },
  { id: 171, name: 'Hyatt Regency Casablanca', location: 'Марокко, Касабланка', rating: 5, price: 55000, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', features: ['Город', 'Океан', 'Бассейн'] },
  
  // Китай
  { id: 43, name: 'Mandarin Oriental Sanya', location: 'Китай, Санья', rating: 5, price: 72000, image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', features: ['Хайнань', 'Пляж', 'SPA'] },
  { id: 44, name: 'Ritz-Carlton Sanya', location: 'Китай, Санья', rating: 5, price: 68000, image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800', features: ['Яолун Бэй', 'Роскошь', 'Гольф'] },
  { id: 45, name: 'Atlantis Sanya', location: 'Китай, Санья', rating: 5, price: 75000, image: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800', features: ['Аквапарк', 'Океанариум', 'Семейный'] },
  { id: 122, name: 'Banyan Tree Sanya', location: 'Китай, Санья', rating: 5, price: 78000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', features: ['Виллы', 'SPA', 'Пляж'] },
  { id: 123, name: 'Anantara Sanya', location: 'Китай, Санья', rating: 5, price: 70000, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', features: ['Роскошь', 'Тропический сад', 'SPA'] },
  { id: 124, name: 'InterContinental Sanya', location: 'Китай, Санья', rating: 5, price: 65000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', features: ['Пляж', 'Бассейн', 'Детский клуб'] },
  { id: 125, name: 'Pullman Sanya', location: 'Китай, Санья', rating: 5, price: 58000, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', features: ['Хайтан Бэй', 'SPA', 'Фитнес'] },
  { id: 126, name: 'Shangri-La Sanya', location: 'Китай, Санья', rating: 5, price: 82000, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', features: ['Виллы', 'Приватный пляж', 'Роскошь'] },
  { id: 127, name: 'Hilton Sanya', location: 'Китай, Санья', rating: 5, price: 62000, image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', features: ['Пляж', 'Бассейны', 'Семейный'] },
  { id: 135, name: 'MGM Grand Sanya', location: 'Китай, Санья', rating: 5, price: 88000, image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800', features: ['Роскошь', 'Казино', 'SPA'] },
  { id: 136, name: 'Park Hyatt Sanya', location: 'Китай, Санья', rating: 5, price: 95000, image: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800', features: ['Модерн', 'Бассейн', 'SPA'] },
  { id: 172, name: 'Edition Sanya', location: 'Китай, Санья', rating: 5, price: 92000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', features: ['Роскошь', 'Модерн', 'Пляж'] },
  { id: 173, name: 'Rosewood Sanya', location: 'Китай, Санья', rating: 5, price: 105000, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', features: ['Виллы', 'SPA', 'Роскошь'] },
  { id: 174, name: 'Waldorf Astoria Hainan', location: 'Китай, Санья', rating: 5, price: 98000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', features: ['Роскошь', 'Гольф', 'SPA'] },
  
  // Куба
  { id: 46, name: 'Paradisus Varadero', location: 'Куба, Варадеро', rating: 5, price: 58000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', features: ['Все включено', 'Пляж', 'SPA'] },
  { id: 47, name: 'Iberostar Selection Varadero', location: 'Куба, Варадеро', rating: 5, price: 52000, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', features: ['Все включено', 'Анимация', 'Детский клуб'] },
  { id: 48, name: 'Melia Varadero', location: 'Куба, Варадеро', rating: 5, price: 55000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', features: ['Центр Варадеро', 'Бассейн', 'SPA'] },
  { id: 128, name: 'Royalton Hicacos', location: 'Куба, Варадеро', rating: 5, price: 62000, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', features: ['Только взрослые', 'Роскошь', 'Пляж'] },
  { id: 129, name: 'Memories Varadero', location: 'Куба, Варадеро', rating: 5, price: 48000, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', features: ['Семейный', 'Все включено', 'Аквапарк'] },
  { id: 130, name: 'Grand Memories Varadero', location: 'Куба, Варадеро', rating: 5, price: 65000, image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', features: ['Роскошь', 'Все включено', 'SPA'] },
  { id: 131, name: 'Blau Varadero', location: 'Куба, Варадеро', rating: 5, price: 54000, image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800', features: ['Все включено', 'Пляж', 'Анимация'] },
  { id: 132, name: 'Meliá Las Americas', location: 'Куба, Варадеро', rating: 5, price: 68000, image: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800', features: ['Гольф', 'Роскошь', 'SPA'] },
  { id: 133, name: 'Iberostar Bella Vista', location: 'Куба, Варадеро', rating: 5, price: 60000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', features: ['Только взрослые', 'Бассейн', 'SPA'] },
  { id: 134, name: 'Ocean Varadero El Patriarca', location: 'Куба, Варадеро', rating: 5, price: 72000, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', features: ['Премиум', 'Все включено', 'Пляж'] },
  { id: 175, name: 'Dhawa Cayo Santa Maria', location: 'Куба, Кайо Санта Мария', rating: 5, price: 68000, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', features: ['Все включено', 'Остров', 'Пляж'] },
  { id: 176, name: 'Sol Cayo Guillermo', location: 'Куба, Кайо Гильермо', rating: 5, price: 58000, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', features: ['Все включено', 'Риф', 'Пляж'] },
  { id: 177, name: 'Valentin Perla Blanca', location: 'Куба, Кайо Санта Мария', rating: 5, price: 65000, image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', features: ['Только взрослые', 'Все включено', 'Роскошь'] }
];

export default function HotelsSection() {
  const [selectedCountry, setSelectedCountry] = useState('Все страны');
  const [priceRange, setPriceRange] = useState('Все цены');

  const [showAll, setShowAll] = useState(false);
  const countries = ['Все страны', 'Турция', 'ОАЭ', 'Таиланд', 'Египет', 'Мальдивы', 'Вьетнам', 'Шри-Ланка', 'Индонезия', 'Марокко', 'Китай', 'Куба'];
  
  const priceRanges = [
    { label: 'Все цены', min: 0, max: Infinity },
    { label: 'До 50,000₽', min: 0, max: 50000 },
    { label: '50,000₽ - 100,000₽', min: 50000, max: 100000 },
    { label: 'От 100,000₽', min: 100000, max: Infinity }
  ];

  const filteredHotels = hotels.filter(hotel => {
    const countryMatch = selectedCountry === 'Все страны' || hotel.location.includes(selectedCountry);
    const selectedPriceRange = priceRanges.find(r => r.label === priceRange);
    const priceMatch = selectedPriceRange && hotel.price >= selectedPriceRange.min && hotel.price <= selectedPriceRange.max;
    return countryMatch && priceMatch;
  });

  const displayedHotels = showAll ? filteredHotels : filteredHotels.slice(0, 12);

  return (
    <section id="hotels" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Лучшие отели
          </h2>
          <p className="text-gray-600 text-lg">Проверенные отели с высоким рейтингом</p>
        </div>

        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-600 flex items-center gap-2 px-3 py-2">
              <Icon name="Globe" size={16} />
              Страна:
            </span>
            {countries.map(country => (
              <button
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCountry === country
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'
                }`}
              >
                {country}
              </button>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-600 flex items-center gap-2 px-3 py-2">
              <Icon name="Wallet" size={16} />
              Цена:
            </span>
            {priceRanges.map(range => (
              <button
                key={range.label}
                onClick={() => setPriceRange(range.label)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  priceRange === range.label
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 text-center">
          <p className="text-gray-600">
            Найдено отелей: <span className="font-bold text-primary">{filteredHotels.length}</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedHotels.map((hotel, idx) => (
            <Card 
              key={hotel.id} 
              className="overflow-hidden group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 animate-scale-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={hotel.image} 
                  alt={hotel.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                  <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-sm">{hotel.rating}.0</span>
                </div>
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
                <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
                  <Icon name="MapPin" size={14} />
                  {hotel.location}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {hotel.features.map((feature, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary text-xs rounded-full font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-sm text-gray-500">от</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {hotel.price.toLocaleString()} ₽
                    </p>
                  </div>
                  <Button className="bg-gradient-to-r from-primary to-yellow-500 hover:shadow-xl transition-all duration-300 hover:scale-105">
                    Забронировать
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {!showAll && filteredHotels.length > 12 && (
          <div className="mt-12 text-center">
            <Button
              size="lg"
              onClick={() => setShowAll(true)}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 gap-2"
            >
              <Icon name="ChevronDown" size={20} />
              Показать еще {filteredHotels.length - 12} отелей
            </Button>
          </div>
        )}

        {showAll && filteredHotels.length > 12 && (
          <div className="mt-12 text-center">
            <Button
              size="lg"
              onClick={() => {
                setShowAll(false);
                document.getElementById('hotels')?.scrollIntoView({ behavior: 'smooth' });
              }}
              variant="outline"
              className="gap-2"
            >
              <Icon name="ChevronUp" size={20} />
              Свернуть
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}