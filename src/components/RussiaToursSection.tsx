import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const russiaTours = [
  {
    id: 1,
    title: 'Сочи - Красная Поляна',
    region: 'Краснодарский край',
    duration: '5 ночей',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
    includes: ['Проживание', 'Трансфер', 'Ски-пасс'],
    season: 'Зима',
    type: 'Горнолыжный'
  },
  {
    id: 2,
    title: 'Сочи - Пляжный отдых',
    region: 'Краснодарский край',
    duration: '7 ночей',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800',
    includes: ['Все включено', 'Пляж', 'Бассейн'],
    season: 'Лето',
    type: 'Пляжный'
  },
  {
    id: 3,
    title: 'Роза Хутор - Люкс',
    region: 'Красная Поляна',
    duration: '4 ночи',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    includes: ['Премиум отель', 'SPA', 'Ски-пасс'],
    season: 'Зима',
    type: 'Горнолыжный'
  },
  {
    id: 4,
    title: 'Имеретинский курорт',
    region: 'Адлер',
    duration: '6 ночей',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    includes: ['Все включено', 'Олимпийский парк', 'Сочи Парк'],
    season: 'Лето',
    type: 'Семейный'
  },
  {
    id: 5,
    title: 'Красная Поляна - Активный отдых',
    region: 'Горы Кавказа',
    duration: '5 ночей',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    includes: ['Хайкинг', 'Канатные дороги', 'Экскурсии'],
    season: 'Лето',
    type: 'Активный'
  },
  {
    id: 6,
    title: 'Сочи - Экскурсионный',
    region: 'Краснодарский край',
    duration: '5 ночей',
    price: 20000,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    includes: ['Экскурсии', 'Дегустации', 'Трансферы'],
    season: 'Круглый год',
    type: 'Экскурсионный'
  }
];

export default function RussiaToursSection() {
  const [selectedSeason, setSelectedSeason] = useState('Все сезоны');

  const seasons = ['Все сезоны', 'Зима', 'Лето', 'Круглый год'];

  const filteredTours = selectedSeason === 'Все сезоны' 
    ? russiaTours 
    : russiaTours.filter(tour => tour.season === selectedSeason);

  return (
    <section id="russia" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            🇷🇺 Туры по России
          </h2>
          <p className="text-gray-600 text-lg">
            Откройте красоту родной страны - от морского побережья до горных вершин
          </p>
        </div>

        <div className="mb-8 flex justify-center gap-3 flex-wrap">
          {seasons.map(season => (
            <button
              key={season}
              onClick={() => setSelectedSeason(season)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                selectedSeason === season
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              {season}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour, idx) => (
            <Card 
              key={tour.id} 
              className="overflow-hidden group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={tour.image} 
                  alt={tour.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                  <span className="font-bold text-sm text-primary">{tour.type}</span>
                </div>
                <div className="absolute top-4 left-4 bg-blue-500/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                  <span className="font-bold text-sm text-white">{tour.season}</span>
                </div>
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold mb-2">{tour.title}</h3>
                <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
                  <Icon name="MapPin" size={14} />
                  {tour.region}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <Icon name="Calendar" size={14} />
                  {tour.duration}
                </div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {tour.includes.map((item, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary text-xs rounded-full font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-sm text-gray-500">от</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {tour.price.toLocaleString()} ₽
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

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Почему туры по России?</h3>
            <div className="grid md:grid-cols-3 gap-4 text-left">
              <div className="flex items-start gap-3">
                <Icon name="CheckCircle2" size={24} className="text-green-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Без виз</p>
                  <p className="text-sm text-gray-600">Не нужны документы</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Plane" size={24} className="text-blue-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Прямые рейсы</p>
                  <p className="text-sm text-gray-600">Из Пулково 1.5-2 часа</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Wallet" size={24} className="text-orange-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Доступные цены</p>
                  <p className="text-sm text-gray-600">От 10,000₽ за тур</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
