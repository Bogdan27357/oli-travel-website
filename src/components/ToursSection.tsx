import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import BookingModal from './BookingModal';
import TourDetailModal from './TourDetailModal';
import TourCompareModal from './TourCompareModal';
import { allTours, Tour } from '@/data/tours';

const countryTabs = [
  { id: 'all', name: 'Все туры', icon: 'Globe', country: null },
  { id: 'turkey', name: 'Турция', icon: 'MapPin', country: 'Турция' },
  { id: 'egypt', name: 'Египет', icon: 'MapPin', country: 'Египет' },
  { id: 'uae', name: 'ОАЭ', icon: 'MapPin', country: 'ОАЭ' },
  { id: 'thailand', name: 'Таиланд', icon: 'MapPin', country: 'Таиланд' },
  { id: 'maldives', name: 'Мальдивы', icon: 'MapPin', country: 'Мальдивы' },
  { id: 'greece', name: 'Греция', icon: 'MapPin', country: 'Греция' },
  { id: 'cyprus', name: 'Кипр', icon: 'MapPin', country: 'Кипр' }
];

export default function ToursSection() {
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [selectedTourForBooking, setSelectedTourForBooking] = useState<{
    title: string;
    hotel: string;
    duration: string;
    dates: string;
    price: number;
  } | null>(null);
  const [selectedTourForDetail, setSelectedTourForDetail] = useState<Tour | null>(null);
  const [compareList, setCompareList] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [transferFilter, setTransferFilter] = useState<string>('all');
  const [priceCategory, setPriceCategory] = useState<string>('all');

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

  const toggleCompare = (tourId: number) => {
    setCompareList(prev => 
      prev.includes(tourId) 
        ? prev.filter(id => id !== tourId)
        : [...prev, tourId]
    );
  };

  const removeFromCompare = (tourId: number) => {
    setCompareList(prev => prev.filter(id => id !== tourId));
  };

  const compareToursData = useMemo(() => {
    return allTours.filter(tour => compareList.includes(tour.id));
  }, [compareList]);

  const getFilteredTours = (country: string | null) => {
    let tours = allTours;
    
    // Filter by country
    if (country) {
      tours = tours.filter(tour => tour.country === country);
    }

    // Apply other filters
    tours = tours.filter(tour => {
      const priceMatch = tour.price >= priceRange[0] && tour.price <= priceRange[1];
      
      const searchLower = searchQuery.toLowerCase();
      const searchMatch = !searchQuery || 
        tour.title.toLowerCase().includes(searchLower) ||
        tour.country.toLowerCase().includes(searchLower) ||
        tour.city.toLowerCase().includes(searchLower) ||
        tour.hotel.toLowerCase().includes(searchLower);

      const transferMatch = transferFilter === 'all' || tour.fromSpb === transferFilter;
      
      // Price category filter
      let categoryMatch = true;
      if (priceCategory === 'budget') {
        categoryMatch = tour.price < 60000;
      } else if (priceCategory === 'medium') {
        categoryMatch = tour.price >= 60000 && tour.price < 150000;
      } else if (priceCategory === 'premium') {
        categoryMatch = tour.price >= 150000;
      }
      
      return priceMatch && searchMatch && transferMatch && categoryMatch;
    });

    // Apply sorting
    if (sortBy === 'price-asc') {
      tours = [...tours].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      tours = [...tours].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popularity') {
      tours = [...tours].sort((a, b) => a.id - b.id);
    }
    
    return tours;
  };

  const tourStats = useMemo(() => {
    return {
      total: allTours.length,
      direct: allTours.filter(t => t.fromSpb === 'direct').length,
      transfer: allTours.filter(t => t.fromSpb === 'transfer').length,
      countries: new Set(allTours.map(t => t.country)).size
    };
  }, []);

  const countryStats = useMemo(() => {
    const stats: Record<string, number> = {};
    countryTabs.forEach(tab => {
      if (tab.country) {
        stats[tab.id] = allTours.filter(t => t.country === tab.country).length;
      } else {
        stats[tab.id] = allTours.length;
      }
    });
    return stats;
  }, []);

  const renderTourCards = (tours: Tour[]) => {
    if (tours.length === 0) {
      return (
        <div className="col-span-full text-center py-12">
          <Icon name="SearchX" size={64} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500 text-xl mb-2">Туры не найдены</p>
          <p className="text-gray-400">Попробуйте изменить параметры поиска</p>
        </div>
      );
    }

    return tours.map((tour, idx) => (
      <Card 
        key={tour.id}
        className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer animate-fade-in flex flex-col"
        style={{ animationDelay: `${idx * 50}ms` }}
        onClick={() => handleTourDetails(tour)}
      >
        <div className="relative h-40 overflow-hidden">
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

          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className="bg-primary">
              {'⭐'.repeat(tour.stars)}
            </Badge>
            <div 
              className="bg-white/90 backdrop-blur-sm p-2 rounded-lg cursor-pointer hover:bg-white transition-all"
              onClick={(e) => {
                e.stopPropagation();
                toggleCompare(tour.id);
              }}
            >
              <Checkbox 
                checked={compareList.includes(tour.id)}
                className="pointer-events-none"
              />
            </div>
          </div>
          
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h4 className="font-bold text-lg mb-1">{tour.title}</h4>
            <p className="text-xs opacity-90 line-clamp-1">{tour.hotel}</p>
          </div>
        </div>
        
        <div className="p-3 bg-white flex-1 flex flex-col">
          <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
            <Icon name="Calendar" size={12} />
            <span>{tour.dates}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
            <Icon name="Clock" size={12} />
            <span>{tour.duration}</span>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-2">
            {tour.includes.slice(0, 2).map((item, i) => (
              <span 
                key={i}
                className="px-1.5 py-0.5 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary text-[10px] rounded-full"
              >
                {item}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-auto">
            <div>
              <p className="text-[10px] text-gray-500">от</p>
              <p className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {tour.price.toLocaleString()} ₽
              </p>
            </div>
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                handleBooking(tour);
              }}
              size="sm"
              className="bg-gradient-to-r from-primary to-secondary hover:shadow-xl transition-all duration-300 hover:scale-105 h-8 px-3 text-xs"
            >
              <Icon name="Send" size={12} className="mr-1" />
              Купить
            </Button>
          </div>
        </div>
      </Card>
    ));
  };

  return (
    <section id="tours" className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Туры из Санкт-Петербурга
          </h2>
          <p className="text-gray-600 text-base mb-3">Прямые рейсы и с пересадками — более {tourStats.total} направлений в {tourStats.countries} стран</p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Badge variant="secondary" className="text-xs px-3 py-1">
              <Icon name="Plane" size={14} className="mr-1.5" />
              {tourStats.direct} прямых рейсов
            </Badge>
            <Badge variant="secondary" className="text-xs px-3 py-1">
              <Icon name="MapPin" size={14} className="mr-1.5" />
              {tourStats.transfer} с пересадками
            </Badge>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-lg mb-6">
          <div className="mb-4">
            <label className="block text-xs font-medium mb-2 text-gray-700">
              <Icon name="DollarSign" size={14} className="inline mr-1" />
              Ценовая категория
            </label>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={priceCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPriceCategory('all')}
                className={priceCategory === 'all' ? 'bg-gradient-to-r from-primary to-secondary' : ''}
              >
                <Icon name="Globe" size={14} className="mr-1.5" />
                Все туры
              </Button>
              <Button
                variant={priceCategory === 'budget' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPriceCategory('budget')}
                className={priceCategory === 'budget' ? 'bg-gradient-to-r from-green-500 to-green-600' : ''}
              >
                <Icon name="Wallet" size={14} className="mr-1.5" />
                Бюджетные (до 60К)
              </Button>
              <Button
                variant={priceCategory === 'medium' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPriceCategory('medium')}
                className={priceCategory === 'medium' ? 'bg-gradient-to-r from-blue-500 to-blue-600' : ''}
              >
                <Icon name="TrendingUp" size={14} className="mr-1.5" />
                Средние (60-150К)
              </Button>
              <Button
                variant={priceCategory === 'premium' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPriceCategory('premium')}
                className={priceCategory === 'premium' ? 'bg-gradient-to-r from-purple-500 to-purple-600' : ''}
              >
                <Icon name="Crown" size={14} className="mr-1.5" />
                Премиум (от 150К)
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="lg:col-span-2">
              <label className="block text-xs font-medium mb-1.5 text-gray-700">
                <Icon name="Search" size={14} className="inline mr-1" />
                Поиск по названию, стране, городу или отелю
              </label>
              <Input
                type="text"
                placeholder="Например: Турция, Rixos, Анталья..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 text-sm"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium mb-1.5 text-gray-700">
                <Icon name="Plane" size={14} className="inline mr-1" />
                Тип перелета
              </label>
              <Select value={transferFilter} onValueChange={setTransferFilter}>
                <SelectTrigger className="w-full h-9 text-sm">
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
              <label className="block text-xs font-medium mb-1.5 text-gray-700">
                <Icon name="ArrowUpDown" size={14} className="inline mr-1" />
                Сортировка
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full h-9 text-sm">
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

          <div className="mt-4">
            <label className="block text-xs font-medium mb-2 text-gray-700">
              <Icon name="Wallet" size={14} className="inline mr-1" />
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

        <Tabs 
          value={selectedCountry} 
          onValueChange={setSelectedCountry}
          className="w-full"
        >
          <div className="relative mb-4">
            <div className="overflow-x-auto scrollbar-hide">
              <TabsList className="inline-flex w-auto min-w-full md:min-w-0 h-auto bg-white p-1.5 rounded-xl shadow-md border-0 gap-1.5">
                {countryTabs.map((tab) => (
                  <TabsTrigger 
                    key={tab.id} 
                    value={tab.id}
                    className="flex-shrink-0 px-3 md:px-4 py-2 rounded-lg font-medium text-xs md:text-sm transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white data-[state=active]:shadow-md hover:scale-105 whitespace-nowrap"
                  >
                    <Icon name={tab.icon as any} size={14} className="mr-1.5 flex-shrink-0" />
                    <span>{tab.name}</span>
                    <Badge 
                      variant="secondary" 
                      className="ml-1.5 bg-white/20 text-inherit border-0 hover:bg-white/30 text-xs px-1.5"
                    >
                      {countryStats[tab.id]}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>

          {countryTabs.map((tab) => {
            const filteredTours = getFilteredTours(tab.country);
            
            return (
              <TabsContent 
                key={tab.id} 
                value={tab.id}
                className="mt-0 animate-fade-in"
              >
                <div className="mb-4 flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    Найдено туров: <span className="font-bold text-primary">{filteredTours.length}</span>
                  </p>
                  
                  {compareList.length > 0 && (
                    <Button
                      onClick={() => setIsCompareModalOpen(true)}
                      size="sm"
                      className="bg-gradient-to-r from-secondary to-primary hover:shadow-xl transition-all relative h-8 px-3 text-xs"
                    >
                      <Icon name="GitCompare" size={14} className="mr-1.5" />
                      Сравнить туры
                      <Badge className="ml-1.5 bg-white text-primary hover:bg-white text-xs px-1.5">
                        {compareList.length}
                      </Badge>
                    </Button>
                  )}
                </div>
                
                <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {renderTourCards(filteredTours)}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>

      <TourDetailModal
        tour={selectedTourForDetail}
        open={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />

      <TourCompareModal
        tours={compareToursData}
        open={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        onRemoveTour={removeFromCompare}
        onBookTour={handleBooking}
      />

      <BookingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tourData={selectedTourForBooking}
      />
    </section>
  );
}