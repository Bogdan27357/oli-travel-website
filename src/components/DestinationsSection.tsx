import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import BookingModal from './BookingModal';
import { allTours } from '@/data/tours';

export default function DestinationsSection() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<any>(null);

  const popularCities = useMemo(() => {
    const cityMap = new Map<string, { tours: typeof allTours, minPrice: number, image: string, country: string }>();
    
    allTours.forEach(tour => {
      const key = tour.city;
      if (!cityMap.has(key)) {
        cityMap.set(key, {
          tours: [tour],
          minPrice: tour.price,
          image: tour.image,
          country: tour.country
        });
      } else {
        const existing = cityMap.get(key)!;
        existing.tours.push(tour);
        existing.minPrice = Math.min(existing.minPrice, tour.price);
      }
    });

    return Array.from(cityMap.entries())
      .map(([city, data]) => ({
        city,
        country: data.country,
        tours: data.tours,
        minPrice: data.minPrice,
        image: data.image
      }))
      .sort((a, b) => a.minPrice - b.minPrice)
      .slice(0, 12);
  }, []);

  const handleCityClick = (city: string) => {
    setSelectedCity(selectedCity === city ? null : city);
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
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#D2956E]">Популярные </span>
            <span className="text-[#5FC9BF]">направления</span>
          </h2>
          <p className="text-gray-600 text-lg">Города и курорты из Санкт-Петербурга</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {popularCities.map((dest, idx) => (
            <div key={dest.city}>
              <Card 
                onClick={() => handleCityClick(dest.city)}
                className={`overflow-hidden group cursor-pointer border-2 transition-all duration-500 animate-fade-in-up ${
                  selectedCity === dest.city 
                    ? 'border-primary shadow-2xl scale-105' 
                    : 'border-transparent shadow-lg hover:shadow-2xl hover:scale-105'
                }`}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={dest.image} 
                    alt={dest.city} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  
                  <div className="absolute top-3 right-3">
                    <div className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {dest.tours.length} {dest.tours.length === 1 ? 'тур' : 'туров'}
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-bold mb-1">{dest.city}</h3>
                    <p className="text-sm opacity-90">{dest.country}</p>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">от</p>
                      <p className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {dest.minPrice.toLocaleString()} ₽
                      </p>
                    </div>
                    <Button 
                      size="sm"
                      className="bg-gradient-to-r from-secondary to-primary hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      {selectedCity === dest.city ? (
                        <>
                          <Icon name="ChevronUp" size={16} className="mr-1" />
                          Скрыть
                        </>
                      ) : (
                        <>
                          <Icon name="ChevronDown" size={16} className="mr-1" />
                          Выбрать
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>

              {selectedCity === dest.city && (
                <div className="mt-4 space-y-3 animate-fade-in">
                  {dest.tours.map((tour, tidx) => (
                    <Card key={tour.id} className="p-4 border-2 border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold mb-1 text-sm">{tour.hotel}</h4>
                          <div className="flex items-center gap-1 mb-2">
                            <span className="text-primary font-semibold text-xs">
                              {'⭐'.repeat(tour.stars)}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-500 mb-2 flex-wrap">
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
                            {tour.includes.slice(0, 3).map((item, i) => (
                              <span key={i} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xs text-gray-500 mb-1">от</p>
                          <p className="text-lg font-bold text-primary mb-2 whitespace-nowrap">
                            {tour.price.toLocaleString()} ₽
                          </p>
                          <Button 
                            onClick={() => handleBooking(tour)}
                            size="sm"
                            className="bg-gradient-to-r from-primary to-secondary"
                          >
                            <Icon name="Send" size={12} className="mr-1" />
                            Купить
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
