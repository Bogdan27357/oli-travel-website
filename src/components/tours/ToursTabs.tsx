import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Tour } from '@/data/tours';
import TourCard from './TourCard';

interface ToursTabsProps {
  countryTabs: Array<{
    id: string;
    name: string;
    icon: string;
    country: string | null;
  }>;
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  countryStats: Record<string, number>;
  getFilteredTours: (country: string | null) => Tour[];
  compareList: number[];
  onCompareClick: () => void;
  onTourClick: (tour: Tour) => void;
  onBooking: (tour: Tour) => void;
  onToggleCompare: (tourId: number) => void;
}

export default function ToursTabs({
  countryTabs,
  selectedCountry,
  onCountryChange,
  countryStats,
  getFilteredTours,
  compareList,
  onCompareClick,
  onTourClick,
  onBooking,
  onToggleCompare
}: ToursTabsProps) {
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
      <TourCard
        key={tour.id}
        tour={tour}
        index={idx}
        isInCompareList={compareList.includes(tour.id)}
        onTourClick={onTourClick}
        onBooking={onBooking}
        onToggleCompare={onToggleCompare}
      />
    ));
  };

  return (
    <Tabs 
      value={selectedCountry} 
      onValueChange={onCountryChange}
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
                  onClick={onCompareClick}
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
  );
}
