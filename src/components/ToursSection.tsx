import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';
import BookingModal from './BookingModal';
import TourDetailModal from './TourDetailModal';
import TourCompareModal from './TourCompareModal';
import { Tour } from '@/data/tours';
import ToursHeader from './tours/ToursHeader';
import ToursFilters from './tours/ToursFilters';
import ToursTabs from './tours/ToursTabs';
import { useTours } from './tours/useTours';
import { useToursFilters } from './tours/useToursFilters';

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
  const { allTours, loading } = useTours();
  
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

  const { getFilteredTours, tourStats } = useToursFilters({
    allTours,
    priceRange,
    searchQuery,
    transferFilter,
    priceCategory,
    sortBy
  });

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
  }, [compareList, allTours]);

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
  }, [allTours]);

  if (loading) {
    return (
      <section id="tours" className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <Icon name="Loader2" size={48} className="animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="tours" className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <ToursHeader tourStats={tourStats} />

        <ToursFilters
          priceCategory={priceCategory}
          onPriceCategoryChange={setPriceCategory}
          tourStats={tourStats}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          transferFilter={transferFilter}
          onTransferFilterChange={setTransferFilter}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
        />

        <ToursTabs
          countryTabs={countryTabs}
          selectedCountry={selectedCountry}
          onCountryChange={setSelectedCountry}
          countryStats={countryStats}
          getFilteredTours={getFilteredTours}
          compareList={compareList}
          onCompareClick={() => setIsCompareModalOpen(true)}
          onTourClick={handleTourDetails}
          onBooking={handleBooking}
          onToggleCompare={toggleCompare}
        />
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
