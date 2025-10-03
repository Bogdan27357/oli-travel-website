import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface ToursHeaderProps {
  tourStats: {
    total: number;
    direct: number;
    transfer: number;
    countries: number;
  };
}

export default function ToursHeader({ tourStats }: ToursHeaderProps) {
  return (
    <div className="text-center mb-6">
      <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Туры из Санкт-Петербурга
      </h2>
      <p className="text-gray-600 text-base mb-3">
        Прямые рейсы и с пересадками — более {tourStats.total} направлений в {tourStats.countries} стран
      </p>
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
  );
}
