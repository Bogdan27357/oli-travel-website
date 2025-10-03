import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import BookingModal from './BookingModal';
import TourDetailModal from './TourDetailModal';
import { allTours, Tour } from '@/data/tours';

const tourCategories = [
  { id: 'all', name: 'Все туры', icon: 'Globe' },
  { id: 'beach', name: 'Пляжный отдых', icon: 'Waves' },
  { id: 'excursion', name: 'Экскурсионные туры', icon: 'Camera' },
  { id: 'ski', name: 'Горнолыжные курорты', icon: 'Mountain' },
  { id: 'exotic', name: 'Экзотика', icon: 'Palmtree' }
];

export default function ToursSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTourForBooking, setSelectedTourForBooking] = useState<{
    title: string;
    hotel: string;
    duration: string;
    dates: string;
    price: number;
  } | null>(null);
  const [selectedTourForDetail, setSelectedTourForDetail] = useState<Tour | null>(null);
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [transferFilter, setTransferFilter] = useState<string>('all');

  const handleBooking = (tour: Tour) => {
    setSelectedTourForBooking({
      title: tour.title,
      hotel: tour.hotel,
      duration: tour.duration,
      dates: tour.dates,
      price: tour.price
    });
    setIsModalOpen(true);
  };

  const handleTourDetails = (tour: Tour) => {
    setSelectedTourForDetail(tour);
    setIsDetailModalOpen(true);
  };

  const filteredTours = useMemo(() => {
    let tours = allTours;
    
    if (selectedCategory !== 'all') {
      tours = tours.filter(tour => tour.category === selectedCategory);
    }

    tours = tours.filter(tour => {
      const priceMatch = tour.price >= priceRange[0] && tour.price <= priceRange[1];
      
      const searchLower = searchQuery.toLowerCase();
      const searchMatch = !searchQuery || 
        tour.title.toLowerCase().includes(searchLower) ||
        tour.country.toLowerCase().includes(searchLower) ||
        tour.city.toLowerCase().includes(searchLower) ||
        tour.hotel.toLowerCase().includes(searchLower);

      const transferMatch = transferFilter === 'all' || tour.fromSpb === transferFilter;
      
      return priceMatch && searchMatch && transferMatch;
    });

    if (sortBy === 'price-asc') {
      tours = [...tours].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      tours = [...tours].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popularity') {
      tours = [...tours].sort((a, b) => a.id - b.id);
    }
    
    return tours;
  }, [selectedCategory, priceRange, searchQuery, sortBy, transferFilter]);

  const tourStats = useMemo(() => {
    return {
      total: allTours.length,
      direct: allTours.filter(t => t.fromSpb === 'direct').length,
      transfer: allTours.filter(t => t.fromSpb === 'transfer').length,
      countries: new Set(allTours.map(t => t.country)).size
    };
  }, []);

  return (
    <section id="tours" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Туры из Санкт-Петербурга
          </h2>
          <p className="text-gray-600 text-lg mb-4">Прямые рейсы и с пересадками — более {tourStats.total} направлений в {tourStats.countries} стран</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Icon name="Plane" size={16} className="mr-2" />
              {tourStats.direct} прямых рейсов
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Icon name="MapPin" size={16} className="mr-2" />
              {tourStats.transfer} с пересадками
            </Badge>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {tourCategories.map((cat) => (
            <Button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              className={`transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-primary to-secondary hover:shadow-xl scale-105'
                  : 'hover:border-primary hover:scale-105'
              }`}
            >
              <Icon name={cat.icon as any} size={18} className="mr-2" />
              {cat.name}
            </Button>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl mb-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                <Icon name="Search" size={16} className="inline mr-2" />
                Поиск по названию, стране, городу или отелю
              </label>
              <Input
                type="text"
                placeholder="Например: Турция, Rixos, Анталья..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                <Icon name="Plane" size={16} className="inline mr-2" />
                Тип перелета
              </label>
              <Select value={transferFilter} onValueChange={setTransferFilter}>
                <SelectTrigger className="w-full h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все варианты</SelectItem>
                  <SelectItem value="direct">Прямой рейс</SelectItem>
                  <SelectItem value="transfer">С пересадкой</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                <Icon name="ArrowUpDown" size={16} className="inline mr-2" />
                Сортировка
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">По популярности</SelectItem>
                  <SelectItem value="price-asc">Сначала дешёвые</SelectItem>
                  <SelectItem value="price-desc">Сначала дорогие</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium mb-3 text-gray-700">
              <Icon name="Wallet" size={16} className="inline mr-2" />
              Цена: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} ₽
            </label>
            <Slider
              min={0}
              max={200000}
              step={5000}
              value={priceRange}
              onValueChange={setPriceRange}
              className="w-full"
            />
          </div>
        </div>

        <div className="mb-4 text-center">
          <p className="text-gray-600">
            Найдено туров: <span className="font-bold text-primary">{filteredTours.length}</span>
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTours.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Icon name="SearchX" size={64} className="mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 text-xl mb-2">Туры не найдены</p>
              <p className="text-gray-400">Попробуйте изменить параметры поиска</p>
            </div>
          ) : filteredTours.map((tour, idx) => (
            <Card 
              key={tour.id}
              className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer animate-fade-in flex flex-col"
              style={{ animationDelay: `${idx * 50}ms` }}
              onClick={() => handleTourDetails(tour)}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={tour.image} 
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                
                <div className="absolute top-3 right-3 flex gap-2">
                  {tour.fromSpb === 'direct' ? (
                    <Badge className="bg-green-500 hover:bg-green-600">
                      <Icon name="Plane" size={12} className="mr-1" />
                      Прямой
                    </Badge>
                  ) : (
                    <Badge className="bg-blue-500 hover:bg-blue-600">
                      <Icon name="MapPin" size={12} className="mr-1" />
                      Пересадка
                    </Badge>
                  )}
                </div>

                <div className="absolute top-3 left-3">
                  <Badge className="bg-primary">
                    {'⭐'.repeat(tour.stars)}
                  </Badge>
                </div>
                
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h4 className="font-bold text-lg mb-1">{tour.title}</h4>
                  <p className="text-xs opacity-90 line-clamp-1">{tour.hotel}</p>
                </div>
              </div>
              
              <div className="p-4 bg-white flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Icon name="Calendar" size={14} />
                  <span className="text-xs">{tour.dates}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <Icon name="Clock" size={14} />
                  <span className="text-xs">{tour.duration}</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {tour.includes.slice(0, 3).map((item, i) => (
                    <span 
                      key={i}
                      className="px-2 py-0.5 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary text-xs rounded-full"
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
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBooking(tour);
                    }}
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

      <TourDetailModal
        tour={selectedTourForDetail}
        open={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />

      <BookingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tourData={selectedTourForBooking}
      />
    </section>
  );
}