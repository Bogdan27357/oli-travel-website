import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Tour } from '@/data/tours';
import { Separator } from '@/components/ui/separator';

interface TourCompareModalProps {
  tours: Tour[];
  open: boolean;
  onClose: () => void;
  onRemoveTour: (tourId: number) => void;
  onBookTour: (tour: Tour) => void;
}

export default function TourCompareModal({ tours, open, onClose, onRemoveTour, onBookTour }: TourCompareModalProps) {
  if (tours.length === 0) return null;

  const comparisonRows = [
    { label: 'Страна', key: 'country' as keyof Tour },
    { label: 'Город', key: 'city' as keyof Tour },
    { label: 'Отель', key: 'hotel' as keyof Tour },
    { label: 'Звезды', key: 'stars' as keyof Tour },
    { label: 'Даты вылета', key: 'dates' as keyof Tour },
    { label: 'Длительность', key: 'duration' as keyof Tour },
    { label: 'Перелет', key: 'fromSpb' as keyof Tour },
    { label: 'Цена', key: 'price' as keyof Tour },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Сравнение туров ({tours.length})
          </DialogTitle>
        </DialogHeader>

        {tours.length < 2 && (
          <div className="text-center py-8 text-gray-500">
            <Icon name="Info" size={48} className="mx-auto mb-4 text-gray-300" />
            <p>Добавьте минимум 2 тура для сравнения</p>
          </div>
        )}

        {tours.length >= 2 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-primary/10 to-secondary/10">
                  <th className="p-4 text-left font-semibold border-b border-gray-200 w-48">
                    Параметр
                  </th>
                  {tours.map((tour) => (
                    <th key={tour.id} className="p-4 border-b border-gray-200 relative">
                      <div className="space-y-3">
                        <img
                          src={tour.image}
                          alt={tour.title}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <h3 className="font-bold text-sm">{tour.title}</h3>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onRemoveTour(tour.id)}
                          className="w-full hover:bg-red-50 hover:text-red-600 hover:border-red-600"
                        >
                          <Icon name="X" size={14} className="mr-1" />
                          Убрать
                        </Button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4 font-semibold text-gray-700 border-b border-gray-200">
                      {row.label}
                    </td>
                    {tours.map((tour) => (
                      <td key={tour.id} className="p-4 border-b border-gray-200 text-center">
                        {row.key === 'stars' && (
                          <Badge className="bg-primary">
                            {'⭐'.repeat(tour[row.key] as number)}
                          </Badge>
                        )}
                        {row.key === 'fromSpb' && (
                          tour[row.key] === 'direct' ? (
                            <Badge className="bg-green-500">
                              <Icon name="Plane" size={12} className="mr-1" />
                              Прямой
                            </Badge>
                          ) : (
                            <Badge className="bg-blue-500">
                              <Icon name="MapPin" size={12} className="mr-1" />
                              Пересадка
                            </Badge>
                          )
                        )}
                        {row.key === 'price' && (
                          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            {(tour[row.key] as number).toLocaleString()} ₽
                          </span>
                        )}
                        {row.key !== 'stars' && row.key !== 'fromSpb' && row.key !== 'price' && (
                          <span className="text-sm">{tour[row.key]}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-gradient-to-r from-primary/5 to-secondary/5">
                  <td className="p-4 font-semibold text-gray-700">
                    Включено в тур
                  </td>
                  {tours.map((tour) => (
                    <td key={tour.id} className="p-4">
                      <div className="space-y-1">
                        {tour.includes.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs">
                            <Icon name="Check" size={12} className="text-green-500 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4"></td>
                  {tours.map((tour) => (
                    <td key={tour.id} className="p-4">
                      <Button
                        onClick={() => {
                          onBookTour(tour);
                          onClose();
                        }}
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-xl transition-all"
                      >
                        <Icon name="Send" size={16} className="mr-2" />
                        Забронировать
                      </Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <Separator className="my-4" />

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Выбрано туров: {tours.length}
          </p>
          <Button onClick={onClose} variant="outline">
            Закрыть
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
