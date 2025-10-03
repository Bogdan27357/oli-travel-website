import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import BookingModal from './BookingModal';

const destinations = [
  {
    id: 1,
    country: 'Турция',
    city: 'Анталья',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&auto=format&fit=crop',
    price: 35000,
    description: 'Пляжный отдых на берегу Средиземного моря',
    tours: [
      {
        title: 'Турция, Анталья',
        hotel: 'Rixos Premium Belek 5*',
        duration: '7 ночей',
        dates: '15-22 октября 2024',
        price: 42000,
        includes: ['Все включено', 'Перелет', 'Трансфер']
      },
      {
        title: 'Турция, Анталья - Белек',
        hotel: 'Regnum Carya Golf 5*',
        duration: '10 ночей',
        dates: '18-28 октября 2024',
        price: 58000,
        includes: ['Ultra All Inclusive', 'Перелет', 'Спа']
      }
    ]
  },
  {
    id: 2,
    country: 'ОАЭ',
    city: 'Дубай',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop',
    price: 65000,
    description: 'Роскошь и современность в сердце пустыни',
    tours: [
      {
        title: 'ОАЭ, Дубай',
        hotel: 'Rove Downtown 3* + экскурсии',
        duration: '6 ночей',
        dates: '18-24 октября 2024',
        price: 58000,
        includes: ['Завтраки', '5 экскурсий', 'Перелет']
      },
      {
        title: 'ОАЭ, Дубай - Пальма Джумейра',
        hotel: 'Atlantis The Palm 5*',
        duration: '7 ночей',
        dates: '20-27 октября 2024',
        price: 125000,
        includes: ['Завтраки', 'Аквапарк', 'Перелет']
      }
    ]
  },
  {
    id: 3,
    country: 'Таиланд',
    city: 'Пхукет',
    image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&auto=format&fit=crop',
    price: 55000,
    description: 'Экзотические пляжи и тропические приключения',
    tours: [
      {
        title: 'Таиланд, Пхукет',
        hotel: 'Novotel Phuket Resort 4*',
        duration: '12 ночей',
        dates: '25 октября - 6 ноября 2024',
        price: 67000,
        includes: ['Завтраки', 'Перелет', 'Трансфер']
      },
      {
        title: 'Таиланд, Пхукет - Патонг',
        hotel: 'Andaman Beach Suites 5*',
        duration: '14 ночей',
        dates: '22 октября - 5 ноября 2024',
        price: 89000,
        includes: ['Завтраки', 'Перелет', 'Экскурсии']
      }
    ]
  },
  {
    id: 4,
    country: 'Египет',
    city: 'Шарм-эль-Шейх',
    image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800&auto=format&fit=crop',
    price: 42000,
    description: 'Красное море и коралловые рифы',
    tours: [
      {
        title: 'Египет, Шарм-эль-Шейх',
        hotel: 'Rixos Premium Seagate 5*',
        duration: '8 ночей',
        dates: '16-24 октября 2024',
        price: 52000,
        includes: ['Все включено', 'Перелет', 'Дайвинг']
      },
      {
        title: 'Египет, Шарм - Наама Бей',
        hotel: 'Baron Resort 5*',
        duration: '10 ночей',
        dates: '19-29 октября 2024',
        price: 48000,
        includes: ['Все включено', 'Перелет', 'Снорклинг']
      }
    ]
  }
];

export default function DestinationsSection() {
  const [selectedDestination, setSelectedDestination] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<any>(null);

  const handleDestinationClick = (id: number) => {
    setSelectedDestination(selectedDestination === id ? null : id);
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#D2956E]">Популярные </span>
            <span className="text-[#5FC9BF]">направления</span>
          </h2>
          <p className="text-gray-600 text-lg">Города и курорты</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, idx) => (
            <div key={dest.id}>
              <Card 
                onClick={() => handleDestinationClick(dest.id)}
                className={`overflow-hidden group cursor-pointer border-2 transition-all duration-500 animate-fade-in-up ${
                  selectedDestination === dest.id 
                    ? 'border-primary shadow-2xl scale-105' 
                    : 'border-transparent shadow-lg hover:shadow-2xl hover:scale-105'
                }`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={dest.image} 
                    alt={dest.city} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-bold mb-1">{dest.city}</h3>
                    <p className="text-sm opacity-90">{dest.country}</p>
                  </div>
                </div>
                <div className="p-5 bg-white">
                  <p className="text-gray-600 mb-4 text-sm">{dest.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">от</p>
                      <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {dest.price.toLocaleString()} ₽
                      </p>
                    </div>
                    <Button className="bg-gradient-to-r from-secondary to-primary hover:shadow-xl transition-all duration-300 hover:scale-105">
                      {selectedDestination === dest.id ? 'Скрыть' : 'Выбрать'}
                    </Button>
                  </div>
                </div>
              </Card>

              {selectedDestination === dest.id && (
                <div className="mt-4 space-y-4 animate-fade-in">
                  {dest.tours.map((tour, tidx) => (
                    <Card key={tidx} className="p-4 border-2 border-primary/20 hover:border-primary/40 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold mb-1">{tour.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{tour.hotel}</p>
                          <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                            <span className="flex items-center gap-1">
                              <Icon name="Calendar" size={12} />
                              {tour.dates}
                            </span>
                            <span className="flex items-center gap-1">
                              <Icon name="Clock" size={12} />
                              {tour.duration}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {tour.includes.map((item, i) => (
                              <span key={i} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-lg font-bold text-primary mb-2">
                            {tour.price.toLocaleString()} ₽
                          </p>
                          <Button 
                            onClick={() => handleBooking(tour)}
                            size="sm"
                            className="bg-gradient-to-r from-primary to-secondary"
                          >
                            Забронировать
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <BookingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tourData={selectedTour}
      />
    </section>
  );
}
