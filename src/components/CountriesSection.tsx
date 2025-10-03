import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import BookingModal from './BookingModal';
import { allTours } from '@/data/tours';

export default function CountriesSection() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<any>(null);

  const countries = useMemo(() => {
    const countryMap = new Map<string, { tours: typeof allTours, image: string }>();
    
    allTours.forEach(tour => {
      if (!countryMap.has(tour.country)) {
        countryMap.set(tour.country, {
          tours: [tour],
          image: tour.image
        });
      } else {
        countryMap.get(tour.country)!.tours.push(tour);
      }
    });

    return Array.from(countryMap.entries())
      .map(([name, data]) => ({
        name,
        tours: data.tours.length,
        toursData: data.tours,
        image: data.image
      }))
      .sort((a, b) => b.tours - a.tours);
  }, []);

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

  const selectedCountryData = countries.find(c => c.name === selectedCountry);

  return (
    <section id="countries" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#D2956E]">Популярные </span>
            <span className="text-[#5FC9BF]">страны</span>
          </h2>
          <p className="text-gray-600 text-lg">Туры из Санкт-Петербурга в {countries.length} стран мира</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
          {countries.map((country, idx) => (
            <Card 
              key={idx} 
              onClick={() => handleCountryClick(country.name)}
              className={`overflow-hidden group cursor-pointer border-2 transition-all duration-300 hover:scale-105 animate-fade-in ${
                selectedCountry === country.name 
                  ? 'border-primary shadow-2xl scale-105' 
                  : 'border-transparent shadow-lg hover:shadow-2xl'
              }`}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="relative h-32 overflow-hidden">
                <img 
                  src={country.image} 
                  alt={country.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <h3 className="font-bold text-sm mb-0.5 truncate">{country.name}</h3>
                  <p className="text-xs opacity-90">{country.tours} {country.tours === 1 ? 'тур' : 'туров'}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {selectedCountry && selectedCountryData && (
          <div className="mt-8 animate-fade-in">
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold mb-2">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Туры в {selectedCountry}
                </span>
              </h3>
              <p className="text-gray-600">Найдено {selectedCountryData.tours} предложений</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedCountryData.toursData.map((tour, idx) => (
                <Card 
                  key={tour.id}
                  className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group animate-fade-in flex flex-col"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={tour.image} 
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    
                    <div className="absolute top-3 left-3">
                      <div className="bg-primary text-white px-2 py-1 rounded-lg text-xs font-semibold">
                        {'⭐'.repeat(tour.stars)}
                      </div>
                    </div>

                    <div className="absolute top-3 right-3">
                      {tour.fromSpb === 'direct' ? (
                        <div className="bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                          <Icon name="Plane" size={12} />
                          Прямой
                        </div>
                      ) : (
                        <div className="bg-blue-500 text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                          <Icon name="MapPin" size={12} />
                          Пересадка
                        </div>
                      )}
                    </div>
                    
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h4 className="font-bold text-lg mb-1">{tour.city}</h4>
                      <p className="text-xs opacity-90 line-clamp-1">{tour.hotel}</p>
                    </div>
                  </div>
                  
                  <div className="p-5 bg-white flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Icon name="Calendar" size={14} />
                      <span className="text-xs">{tour.dates}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <Icon name="Clock" size={14} />
                      <span className="text-xs">{tour.duration}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tour.includes.slice(0, 3).map((item, i) => (
                        <span 
                          key={i}
                          className="px-2 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary text-xs rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                      <div>
                        <p className="text-xs text-gray-500">от</p>
                        <p className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          {tour.price.toLocaleString()} ₽
                        </p>
                      </div>
                      <Button 
                        onClick={() => handleBooking(tour)}
                        size="sm"
                        className="bg-gradient-to-r from-primary to-secondary hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        <Icon name="Send" size={14} className="mr-1" />
                        Купить
                      </Button>
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
