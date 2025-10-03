import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const tourCategories = [
  { id: 1, name: 'Пляжный отдых', duration: '7-14 дней', price: 35000, icon: 'Waves' },
  { id: 2, name: 'Экскурсионные туры', duration: '5-10 дней', price: 45000, icon: 'Camera' },
  { id: 3, name: 'Горнолыжные курорты', duration: '7-10 дней', price: 55000, icon: 'Mountain' },
  { id: 4, name: 'Экзотика', duration: '10-14 дней', price: 75000, icon: 'Palmtree' }
];

const tourExamples = {
  1: [
    {
      id: 1,
      title: 'Турция, Анталья',
      hotel: 'Rixos Premium Belek 5*',
      duration: '7 ночей',
      dates: '15-22 октября 2024',
      price: 42000,
      image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=600&auto=format&fit=crop',
      includes: ['Все включено', 'Перелет', 'Трансфер']
    },
    {
      id: 2,
      title: 'Египет, Хургада',
      hotel: 'Jaz Aquamarine 5*',
      duration: '10 ночей',
      dates: '20-30 октября 2024',
      price: 38000,
      image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=600&auto=format&fit=crop',
      includes: ['Все включено', 'Перелет', 'Страховка']
    },
    {
      id: 3,
      title: 'Таиланд, Пхукет',
      hotel: 'Novotel Phuket Resort 4*',
      duration: '12 ночей',
      dates: '25 октября - 6 ноября 2024',
      price: 67000,
      image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=600&auto=format&fit=crop',
      includes: ['Завтраки', 'Перелет', 'Трансфер']
    }
  ],
  2: [
    {
      id: 4,
      title: 'ОАЭ, Дубай + Абу-Даби',
      hotel: 'Rove Downtown 3* + экскурсии',
      duration: '6 ночей',
      dates: '18-24 октября 2024',
      price: 58000,
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&auto=format&fit=crop',
      includes: ['Завтраки', '5 экскурсий', 'Перелет']
    },
    {
      id: 5,
      title: 'Италия, Рим + Флоренция',
      hotel: 'Hotel 3-4* + экскурсии',
      duration: '8 ночей',
      dates: '22-30 октября 2024',
      price: 72000,
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&auto=format&fit=crop',
      includes: ['Завтраки', 'Экскурсии', 'Перелет']
    },
    {
      id: 6,
      title: 'Греция, Афины + острова',
      hotel: 'Hotel 3-4*',
      duration: '7 ночей',
      dates: '16-23 октября 2024',
      price: 65000,
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&auto=format&fit=crop',
      includes: ['Завтраки', 'Экскурсии', 'Паромы']
    }
  ],
  3: [
    {
      id: 7,
      title: 'Австрия, Зёльден',
      hotel: 'Hotel Bergland 4*',
      duration: '7 ночей',
      dates: '15-22 декабря 2024',
      price: 95000,
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&auto=format&fit=crop',
      includes: ['Завтраки', 'Ски-пасс 6 дней', 'Перелет']
    },
    {
      id: 8,
      title: 'Франция, Шамони',
      hotel: 'Hotel Aiguille du Midi 3*',
      duration: '8 ночей',
      dates: '20-28 декабря 2024',
      price: 102000,
      image: 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=600&auto=format&fit=crop',
      includes: ['Завтраки', 'Ски-пасс', 'Трансфер']
    },
    {
      id: 9,
      title: 'Швейцария, Церматт',
      hotel: 'Hotel Alphubel 3*',
      duration: '7 ночей',
      dates: '18-25 декабря 2024',
      price: 125000,
      image: 'https://images.unsplash.com/photo-1551524164-687a55dd1126?w=600&auto=format&fit=crop',
      includes: ['Завтраки', 'Ски-пасс 6 дней', 'Перелет']
    }
  ],
  4: [
    {
      id: 10,
      title: 'Мальдивы, Атолл Мале',
      hotel: 'Paradise Island Resort 5*',
      duration: '10 ночей',
      dates: '25 октября - 4 ноября 2024',
      price: 145000,
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&auto=format&fit=crop',
      includes: ['Все включено', 'Перелет', 'Гидросамолет']
    },
    {
      id: 11,
      title: 'Сейшелы, о. Маэ',
      hotel: 'Berjaya Beau Vallon Bay 4*',
      duration: '12 ночей',
      dates: '28 октября - 9 ноября 2024',
      price: 178000,
      image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=600&auto=format&fit=crop',
      includes: ['Полупансион', 'Перелет', 'Трансфер']
    },
    {
      id: 12,
      title: 'Шри-Ланка, Бентота',
      hotel: 'Centara Ceysands Resort 5*',
      duration: '11 ночей',
      dates: '20-31 октября 2024',
      price: 89000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop',
      includes: ['Все включено', 'Перелет', 'Экскурсия']
    }
  ]
};

export default function ToursSection() {
  const [selectedCategory, setSelectedCategory] = useState(1);

  return (
    <section id="tours" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Виды туров
          </h2>
          <p className="text-gray-600 text-lg">Выберите идеальный формат отдыха</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tourCategories.map((tour, idx) => (
            <Card 
              key={tour.id}
              onClick={() => setSelectedCategory(tour.id)}
              className={`p-8 text-center transition-all duration-300 cursor-pointer group border-2 ${
                selectedCategory === tour.id
                  ? 'border-primary shadow-2xl scale-105 bg-gradient-to-br from-primary/5 to-secondary/5'
                  : 'border-transparent hover:border-primary/30 hover:shadow-xl hover:scale-105 bg-gradient-to-br from-white to-gray-50'
              }`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform ${
                selectedCategory === tour.id
                  ? 'bg-gradient-to-br from-primary to-secondary'
                  : 'bg-gradient-to-br from-primary/80 to-secondary/80'
              }`}>
                <Icon name={tour.icon as any} size={40} className="text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3">{tour.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{tour.duration}</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                от {tour.price.toLocaleString()} ₽
              </p>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8">
          <h3 className="text-2xl font-bold text-center mb-8">
            Актуальные предложения
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tourExamples[selectedCategory as keyof typeof tourExamples].map((example, idx) => (
              <Card 
                key={example.id}
                className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={example.image} 
                    alt={example.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h4 className="font-bold text-lg mb-1">{example.title}</h4>
                    <p className="text-xs opacity-90">{example.hotel}</p>
                  </div>
                </div>
                <div className="p-5 bg-white">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <Icon name="Calendar" size={14} />
                    <span>{example.dates}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <Icon name="Clock" size={14} />
                    <span>{example.duration}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {example.includes.map((item, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary text-xs rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500">от</p>
                      <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {example.price.toLocaleString()} ₽
                      </p>
                    </div>
                    <Button className="bg-gradient-to-r from-primary to-secondary hover:shadow-xl transition-all duration-300 hover:scale-105">
                      Забронировать
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}