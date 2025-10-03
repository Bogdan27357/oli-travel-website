import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

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

interface TourCardProps {
  tour: Tour;
  onEdit: (tour: Tour) => void;
  onDelete: (id: number) => void;
  formatDate: (dateString: string) => string;
}

export default function TourCard({ tour, onEdit, onDelete, formatDate }: TourCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <img
          src={tour.image_url || '/placeholder.jpg'}
          alt={tour.hotel}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          {tour.is_hot && (
            <Badge className="bg-red-500 hover:bg-red-600 text-white">
              <Icon name="Flame" size={14} className="mr-1" />
              Горящий
            </Badge>
          )}
          {!tour.is_active && (
            <Badge variant="secondary">
              Неактивный
            </Badge>
          )}
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>{tour.country}, {tour.city}</span>
          <div className="flex">
            {[...Array(tour.stars)].map((_, i) => (
              <Icon key={i} name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
            ))}
          </div>
        </CardTitle>
        <p className="text-sm text-gray-600">{tour.hotel}</p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Icon name="Calendar" size={16} />
            <span>{formatDate(tour.date_from)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Icon name="Moon" size={16} />
            <span>{tour.nights} ночей</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Icon name="Users" size={16} />
            <span>{tour.people} чел.</span>
          </div>
          {tour.flight && (
            <div className="flex items-center gap-2 text-gray-600">
              <Icon name="Plane" size={16} />
              <span>Перелет</span>
            </div>
          )}
        </div>

        {tour.description && (
          <p className="text-sm text-gray-700 line-clamp-2">
            {tour.description}
          </p>
        )}

        <div className="flex items-end justify-between pt-2 border-t">
          <div>
            <div className="text-2xl font-bold text-primary">
              {tour.price.toLocaleString()} ₽
            </div>
            {tour.old_price > 0 && (
              <div className="text-sm text-gray-500 line-through">
                {tour.old_price.toLocaleString()} ₽
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onEdit(tour)}
            >
              <Icon name="Edit" size={16} />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                  <Icon name="Trash2" size={16} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Удалить тур?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Это действие нельзя отменить. Тур "{tour.hotel}" будет удален навсегда.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Отмена</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(tour.id!)}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Удалить
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
