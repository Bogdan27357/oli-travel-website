import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import TourCard from './TourCard';

interface Tour {
  id?: number;
  country: string;
  city: string;
  hotel: string;
  stars: number;
  date_from: string;
  date_to: string;
  nights: number;
  people: number;
  flight: boolean;
  price: number;
  old_price: number;
  image_url: string;
  description: string;
  included: string[];
  is_hot: boolean;
  is_active: boolean;
}

interface ToursListProps {
  tours: Tour[];
  searchQuery: string;
  onEdit: (tour: Tour) => void;
  onDelete: (id: number) => void;
  onClearSearch: () => void;
  formatDate: (dateString: string) => string;
}

export default function ToursList({
  tours,
  searchQuery,
  onEdit,
  onDelete,
  onClearSearch,
  formatDate,
}: ToursListProps) {
  if (tours.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Icon name="Plane" size={64} className="text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {searchQuery ? 'Туры не найдены' : 'Нет туров'}
          </h3>
          <p className="text-gray-500 text-center mb-4">
            {searchQuery
              ? 'Попробуйте изменить параметры поиска'
              : 'Добавьте первый тур, нажав кнопку выше'}
          </p>
          {searchQuery && (
            <Button variant="outline" onClick={onClearSearch}>
              Сбросить фильтр
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tours.map((tour) => (
        <TourCard
          key={tour.id}
          tour={tour}
          onEdit={onEdit}
          onDelete={onDelete}
          formatDate={formatDate}
        />
      ))}
    </div>
  );
}
