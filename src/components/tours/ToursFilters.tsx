import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface ToursFiltersProps {
  priceCategory: string;
  onPriceCategoryChange: (category: string) => void;
  tourStats: {
    total: number;
    budget: number;
    medium: number;
    premium: number;
  };
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  transferFilter: string;
  onTransferFilterChange: (filter: string) => void;
  sortBy: string;
  onSortByChange: (sort: string) => void;
  priceRange: number[];
  onPriceRangeChange: (range: number[]) => void;
}

export default function ToursFilters({
  priceCategory,
  onPriceCategoryChange,
  tourStats,
  searchQuery,
  onSearchQueryChange,
  transferFilter,
  onTransferFilterChange,
  sortBy,
  onSortByChange,
  priceRange,
  onPriceRangeChange
}: ToursFiltersProps) {
  return (
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
            onClick={() => onPriceCategoryChange('all')}
            className={priceCategory === 'all' ? 'bg-gradient-to-r from-primary to-secondary' : ''}
          >
            <Icon name="Globe" size={14} className="mr-1.5" />
            Все туры
            <Badge variant="secondary" className="ml-2 bg-white/20 text-inherit">
              {tourStats.total}
            </Badge>
          </Button>
          <Button
            variant={priceCategory === 'budget' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onPriceCategoryChange('budget')}
            className={priceCategory === 'budget' ? 'bg-gradient-to-r from-green-500 to-green-600' : ''}
          >
            <Icon name="Wallet" size={14} className="mr-1.5" />
            Бюджетные (до 60К)
            <Badge variant="secondary" className="ml-2 bg-white/20 text-inherit">
              {tourStats.budget}
            </Badge>
          </Button>
          <Button
            variant={priceCategory === 'medium' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onPriceCategoryChange('medium')}
            className={priceCategory === 'medium' ? 'bg-gradient-to-r from-blue-500 to-blue-600' : ''}
          >
            <Icon name="TrendingUp" size={14} className="mr-1.5" />
            Средние (60-150К)
            <Badge variant="secondary" className="ml-2 bg-white/20 text-inherit">
              {tourStats.medium}
            </Badge>
          </Button>
          <Button
            variant={priceCategory === 'premium' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onPriceCategoryChange('premium')}
            className={priceCategory === 'premium' ? 'bg-gradient-to-r from-purple-500 to-purple-600' : ''}
          >
            <Icon name="Crown" size={14} className="mr-1.5" />
            Премиум (от 150К)
            <Badge variant="secondary" className="ml-2 bg-white/20 text-inherit">
              {tourStats.premium}
            </Badge>
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
            onChange={(e) => onSearchQueryChange(e.target.value)}
            className="w-full h-9 text-sm"
          />
        </div>
        
        <div>
          <label className="block text-xs font-medium mb-1.5 text-gray-700">
            <Icon name="Plane" size={14} className="inline mr-1" />
            Тип перелета
          </label>
          <Select value={transferFilter} onValueChange={onTransferFilterChange}>
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
          <Select value={sortBy} onValueChange={onSortByChange}>
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
          onValueChange={onPriceRangeChange}
          className="w-full"
        />
      </div>
    </div>
  );
}
