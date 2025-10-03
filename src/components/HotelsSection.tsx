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
  
  // ОАЭ
  { id: 9, name: 'Atlantis The Palm', location: 'ОАЭ, Дубай', rating: 5, price: 85000, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800', features: ['Аквапарк', 'Океанариум', 'Дельфинарий'] },
  { id: 10, name: 'Burj Al Arab', location: 'ОАЭ, Дубай', rating: 5, price: 150000, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800', features: ['7 звезд', 'Люкс', 'Вертолет'] },
  { id: 11, name: 'Jumeirah Beach Hotel', location: 'ОАЭ, Дубай', rating: 5, price: 75000, image: 'https://images.unsplash.com/photo-1549294413-26f195200c16?w=800', features: ['Пляж', 'Аквапарк', 'Вид на Burj'] },
  { id: 12, name: 'Rixos Premium Dubai', location: 'ОАЭ, Дубай', rating: 5, price: 70000, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', features: ['Все включено', 'JBR пляж', 'Детский клуб'] },
  { id: 13, name: 'Waldorf Astoria', location: 'ОАЭ, Дубай', rating: 5, price: 95000, image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800', features: ['Роскошь', 'SPA', 'Michelin рестораны'] },
  { id: 14, name: 'Sheraton Jumeirah', location: 'ОАЭ, Дубай', rating: 5, price: 65000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', features: ['Пляж', 'Бассейн', 'Фитнес'] },
  
  // Таиланд
  { id: 15, name: 'The Slate Phuket', location: 'Таиланд, Пхукет', rating: 5, price: 58000, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', features: ['Бутик', 'SPA', 'Тайский массаж'] },
  { id: 16, name: 'Anantara Phuket', location: 'Таиланд, Пхукет', rating: 5, price: 62000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', features: ['Виллы', 'Приватный пляж', 'SPA'] },
  { id: 17, name: 'Centara Grand Phuket', location: 'Таиланд, Пхукет', rating: 5, price: 52000, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', features: ['Аквапарк', 'Семейный', 'Анимация'] },
  { id: 18, name: 'Dusit Thani Pattaya', location: 'Таиланд, Паттайя', rating: 5, price: 48000, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', features: ['Центр города', 'Пляж', 'SPA'] },
  { id: 19, name: 'Amari Pattaya', location: 'Таиланд, Паттайя', rating: 5, price: 45000, image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', features: ['Набережная', 'Бассейн', 'Массаж'] },
  { id: 20, name: 'InterContinental Samui', location: 'Таиланд, Самуи', rating: 5, price: 68000, image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800', features: ['Виллы', 'Тропический сад', 'SPA'] },
  
  // Египет
  { id: 21, name: 'Rixos Sharm El Sheikh', location: 'Египет, Шарм-эль-Шейх', rating: 5, price: 38000, image: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800', features: ['Все включено', 'Коралловый риф', 'Аквапарк'] },
  { id: 22, name: 'Baron Palace', location: 'Египет, Хургада', rating: 5, price: 35000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', features: ['Дворец', 'SPA', 'Собственный пляж'] },
  { id: 23, name: 'Steigenberger Al Dau', location: 'Египет, Хургада', rating: 5, price: 40000, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', features: ['Снорклинг', 'Дайвинг', 'Аквапарк'] },
  { id: 24, name: 'Albatros Palace', location: 'Египет, Хургада', rating: 5, price: 36000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', features: ['Все включено', 'Аквапарк', 'Анимация'] },
  { id: 25, name: 'Savoy Sharm', location: 'Египет, Шарм-эль-Шейх', rating: 5, price: 42000, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', features: ['Наама Бей', 'Риф', 'SPA'] },
  
  // Мальдивы
  { id: 26, name: 'Conrad Maldives', location: 'Мальдивы, Рангали', rating: 5, price: 180000, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', features: ['Водные виллы', 'Подводный ресторан', 'SPA'] },
  { id: 27, name: 'Anantara Dhigu', location: 'Мальдивы, Атолл Мале', rating: 5, price: 150000, image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', features: ['Бунгало', 'Дайвинг', 'Романтик'] },
  { id: 28, name: 'Sun Siyam Iru Fushi', location: 'Мальдивы, Ноону', rating: 5, price: 165000, image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800', features: ['Приватный остров', 'SPA', 'Снорклинг'] },
  { id: 29, name: 'Kurumba Maldives', location: 'Мальдивы, Атолл Мале', rating: 5, price: 145000, image: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800', features: ['Близко к аэропорту', 'Виллы', 'Дайвинг'] },
  { id: 30, name: 'Velassaru Maldives', location: 'Мальдивы, Южный Мале', rating: 5, price: 155000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', features: ['Романтик', 'Водные виллы', 'SPA'] },
  
  // Вьетнам
  { id: 31, name: 'Vinpearl Nha Trang', location: 'Вьетнам, Нячанг', rating: 5, price: 48000, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', features: ['Остров', 'Аквапарк', 'Канатная дорога'] },
  { id: 32, name: 'InterContinental Danang', location: 'Вьетнам, Дананг', rating: 5, price: 52000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', features: ['Пляж', 'SPA', 'Семейный'] },
  { id: 33, name: 'Sheraton Nha Trang', location: 'Вьетнам, Нячанг', rating: 5, price: 45000, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', features: ['Центр города', 'Бассейн', 'Фитнес'] },
  { id: 34, name: 'Furama Resort Danang', location: 'Вьетнам, Дананг', rating: 5, price: 50000, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', features: ['Пляж', 'Гольф', 'SPA'] },
  
  // Шри-Ланка
  { id: 35, name: 'Heritance Kandalama', location: 'Шри-Ланка, Дамбулла', rating: 5, price: 55000, image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', features: ['Эко-отель', 'Озеро', 'SPA'] },
  { id: 36, name: 'Jetwing Lighthouse', location: 'Шри-Ланка, Галле', rating: 5, price: 48000, image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800', features: ['Океан', 'Infinity pool', 'Массаж'] },
  { id: 37, name: 'Anantara Peace Haven', location: 'Шри-Ланка, Тангалле', rating: 5, price: 62000, image: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800', features: ['Виллы', 'Приватный пляж', 'SPA'] },
  
  // Индонезия (Бали)
  { id: 38, name: 'AYANA Resort Bali', location: 'Индонезия, Бали', rating: 5, price: 68000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', features: ['Rock Bar', 'SPA', 'Виллы'] },
  { id: 39, name: 'Padma Resort Ubud', location: 'Индонезия, Убуд', rating: 5, price: 58000, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', features: ['Джунгли', 'Infinity pool', 'SPA'] },
  { id: 40, name: 'St. Regis Bali', location: 'Индонезия, Нуса Дуа', rating: 5, price: 95000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', features: ['Роскошь', 'Виллы', 'Butler service'] },
  
  // Марокко
  { id: 41, name: 'La Mamounia', location: 'Марокко, Марракеш', rating: 5, price: 75000, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', features: ['Дворец', 'Сады', 'SPA'] },
  { id: 42, name: 'Royal Mansour', location: 'Марокко, Марракеш', rating: 5, price: 120000, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', features: ['Риады', 'Роскошь', 'SPA'] },
  
  // Греция
  { id: 43, name: 'Blue Palace Crete', location: 'Греция, Крит', rating: 5, price: 65000, image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', features: ['Эгейское море', 'Виллы', 'SPA'] },
  { id: 44, name: 'Ikos Dassia', location: 'Греция, Корфу', rating: 5, price: 70000, image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800', features: ['Все включено', 'Michelin рестораны', 'Пляж'] },
  { id: 45, name: 'Sani Resort', location: 'Греция, Халкидики', rating: 5, price: 68000, image: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800', features: ['Марина', 'Гольф', 'Детский клуб'] },
  
  // Испания
  { id: 46, name: 'Iberostar Grand Portals', location: 'Испания, Майорка', rating: 5, price: 72000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', features: ['Только взрослые', 'SPA', 'Яхт-клуб'] },
  { id: 47, name: 'Gran Hotel Bahia del Duque', location: 'Испания, Тенерифе', rating: 5, price: 68000, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', features: ['Роскошь', 'Тропические сады', 'SPA'] },
  { id: 48, name: 'Puente Romano', location: 'Испания, Марбелья', rating: 5, price: 95000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', features: ['Теннис', 'Пляжный клуб', 'Nobu'] }
];

export default function HotelsSection() {
  return (
    <section id="hotels" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Лучшие отели
          </h2>
          <p className="text-gray-600 text-lg">Проверенные отели с высоким рейтингом</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel, idx) => (
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
      </div>
    </section>
  );
}