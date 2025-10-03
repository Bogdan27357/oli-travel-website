import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import BookingModal from './BookingModal';

const countries = [
  { name: 'Турция', tours: 156, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400' },
  { name: 'ОАЭ', tours: 89, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400' },
  { name: 'Таиланд', tours: 112, image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=400' },
  { name: 'Египет', tours: 134, image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=400' },
  { name: 'Мальдивы', tours: 67, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400' },
  { name: 'Греция', tours: 98, image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400' }
];

const toursByCountry: Record<string, any[]> = {
  'Турция': [
    {
      title: 'Турция, Анталья',
      hotel: 'Rixos Premium Belek 5*',
      duration: '7 ночей',
      dates: '15-22 октября 2024',
      price: 42000,
      image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=600',
      includes: ['Все включено', 'Перелет', 'Трансфер']
    },
    {
      title: 'Турция, Кемер',
      hotel: 'Queen\'s Park Tekirova 5*',
      duration: '10 ночей',
      dates: '18-28 октября 2024',
      price: 48000,
      image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600',
      includes: ['Все включено', 'Перелет', 'Страховка']
    }
  ],
  'ОАЭ': [
    {
      title: 'ОАЭ, Дубай',
      hotel: 'Rove Downtown 3* + экскурсии',
      duration: '6 ночей',
      dates: '18-24 октября 2024',
      price: 58000,
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600',
      includes: ['Завтраки', '5 экскурсий', 'Перелет']
    },
    {
      title: 'ОАЭ, Абу-Даби',
      hotel: 'Park Rotana 5*',
      duration: '7 ночей',
      dates: '20-27 октября 2024',
      price: 72000,
      image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600',
      includes: ['Завтраки', 'Экскурсии', 'Трансфер']
    }
  ],
  'Таиланд': [
    {
      title: 'Таиланд, Пхукет',
      hotel: 'Novotel Phuket Resort 4*',
      duration: '12 ночей',
      dates: '25 октября - 6 ноября 2024',
      price: 67000,
      image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=600',
      includes: ['Завтраки', 'Перелет', 'Трансфер']
    },
    {
      title: 'Таиланд, Паттайя',
      hotel: 'LK Emerald Beach 3*',
      duration: '10 ночей',
      dates: '22 октября - 1 ноября 2024',
      price: 58000,
      image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600',
      includes: ['Завтраки', 'Перелет', 'Экскурсия']
    }
  ],
  'Египет': [
    {
      title: 'Египет, Хургада',
      hotel: 'Jaz Aquamarine 5*',
      duration: '10 ночей',
      dates: '20-30 октября 2024',
      price: 38000,
      image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=600',
      includes: ['Все включено', 'Перелет', 'Страховка']
    },
    {
      title: 'Египет, Шарм-эль-Шейх',
      hotel: 'Rixos Premium Seagate 5*',
      duration: '8 ночей',
      dates: '16-24 октября 2024',
      price: 52000,
      image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=600',
      includes: ['Все включено', 'Перелет', 'Дайвинг']
    }
  ],
  'Мальдивы': [
    {
      title: 'Мальдивы, Атолл Мале',
      hotel: 'Paradise Island Resort 5*',
      duration: '10 ночей',
      dates: '25 октября - 4 ноября 2024',
      price: 145000,
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600',
      includes: ['Все включено', 'Перелет', 'Гидросамолет']
    },
    {
      title: 'Мальдивы, Ари Атолл',
      hotel: 'Sun Siyam Iru Fushi 5*',
      duration: '12 ночей',
      dates: '28 октября - 9 ноября 2024',
      price: 198000,
      image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=600',
      includes: ['Все включено', 'Перелет', 'Спа']
    }
  ],
  'Греция': [
    {
      title: 'Греция, Афины + острова',
      hotel: 'Hotel 3-4*',
      duration: '7 ночей',
      dates: '16-23 октября 2024',
      price: 65000,
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600',
      includes: ['Завтраки', 'Экскурсии', 'Паромы']
    },
    {
      title: 'Греция, Крит',
      hotel: 'Stella Island Resort 5*',
      duration: '10 ночей',
      dates: '19-29 октября 2024',
      price: 78000,
      image: 'https://images.unsplash.com/photo-1601581875039-e899893d0dca?w=600',
      includes: ['Полупансион', 'Перелет', 'Трансфер']
    }
  ]
};

export default function CountriesSection() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<any>(null);

  const handleCountryClick = (countryName: string) => {
    setSelectedCountry(selectedCountry === countryName ? null : countryName);
  };

  const handleBooking = (tour: any) => {
    setSelectedTour({
      title: tour.title,
      hotel: tour.hotel,
      duration: tour.duration,
      dates: tour.dates,
      price: tour.price
    });
    setIsModalOpen(true);
  };

  return (
    <section id="countries" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Популярные{' '}
            </span>
            <span className="text-[#5FC9BF]">страны</span>
          </h2>
          <p className="text-gray-600 text-lg">Прямые рейсы из Санкт-Петербурга</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {countries.map((country, idx) => (
            <Card 
              key={idx} 
              onClick={() => handleCountryClick(country.name)}
              className={`overflow-hidden group cursor-pointer border-2 transition-all duration-300 hover:scale-105 ${
                selectedCountry === country.name 
                  ? 'border-primary shadow-2xl scale-105' 
                  : 'border-transparent shadow-lg hover:shadow-2xl'
              }`}
            >
              <div className="relative h-32 overflow-hidden">
                <img 
                  src={country.image} 
                  alt={country.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <h3 className="font-bold text-sm mb-0.5">{country.name}</h3>
                  <p className="text-xs opacity-90">{country.tours} туров</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {selectedCountry && toursByCountry[selectedCountry] && (
          <div className="mt-8 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Туры в {selectedCountry}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {toursByCountry[selectedCountry].map((tour, idx) => (
                <Card 
                  key={idx}
                  className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="relative md:w-1/2 h-48 md:h-auto overflow-hidden">
                      <img 
                        src={tour.image} 
                        alt={tour.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="md:w-1/2 p-6 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-lg mb-2">{tour.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{tour.hotel}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <Icon name="Calendar" size={14} />
                          <span>{tour.dates}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                          <Icon name="Clock" size={14} />
                          <span>{tour.duration}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {tour.includes.map((item: string, i: number) => (
                            <span 
                              key={i}
                              className="px-2 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary text-xs rounded-full"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t">
                        <div>
                          <p className="text-xs text-gray-500">от</p>
                          <p className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            {tour.price.toLocaleString()} ₽
                          </p>
                        </div>
                        <Button 
                          onClick={() => handleBooking(tour)}
                          className="bg-gradient-to-r from-primary to-secondary hover:shadow-xl transition-all"
                        >
                          Забронировать
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <BookingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tourData={selectedTour}
      />
    </section>
  );
}
