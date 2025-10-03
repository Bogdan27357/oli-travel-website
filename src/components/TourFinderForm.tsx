import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { allTours, Tour } from '@/data/tours';
import { useToast } from '@/hooks/use-toast';

const TourFinderForm = () => {
  const { toast } = useToast();
  const [budget, setBudget] = useState([50000, 300000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [flightType, setFlightType] = useState<string>('');
  const [foundTours, setFoundTours] = useState<Tour[]>([]);
  const [showResults, setShowResults] = useState(false);

  const categories = [
    { id: 'beach', label: 'Пляжный отдых', icon: '🏖️' },
    { id: 'exotic', label: 'Экзотика', icon: '🌴' },
    { id: 'excursion', label: 'Экскурсионный', icon: '🏛️' },
    { id: 'ski', label: 'Горнолыжный', icon: '⛷️' }
  ];

  const months = [
    { id: 'октября', label: 'Октябрь' },
    { id: 'ноября', label: 'Ноябрь' },
    { id: 'декабря', label: 'Декабрь' }
  ];

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSearch = () => {
    const filtered = allTours.filter(tour => {
      const priceMatch = tour.price >= budget[0] && tour.price <= budget[1];
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(tour.category);
      const monthMatch = !selectedMonth || tour.dates.toLowerCase().includes(selectedMonth);
      const flightMatch = !flightType || tour.fromSpb === flightType;

      return priceMatch && categoryMatch && monthMatch && flightMatch;
    });

    setFoundTours(filtered);
    setShowResults(true);

    toast({
      title: `Найдено туров: ${filtered.length}`,
      description: 'Смотрите результаты ниже',
    });
  };

  const resetFilters = () => {
    setBudget([50000, 300000]);
    setSelectedCategories([]);
    setSelectedMonth('');
    setFlightType('');
    setShowResults(false);
    setFoundTours([]);
  };

  return (
    <section id="tour-finder" className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full mb-4">
            <Icon name="Search" size={20} />
            <span className="font-semibold">Подбор тура</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Найдите идеальный тур
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Ответьте на несколько вопросов, и мы подберем туры под ваши пожелания
          </p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
            <CardTitle className="text-2xl text-center">Фильтры подбора</CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div>
              <Label className="text-lg font-semibold mb-4 block">
                💰 Бюджет на двоих: {budget[0].toLocaleString('ru-RU')} ₽ - {budget[1].toLocaleString('ru-RU')} ₽
              </Label>
              <Slider
                value={budget}
                onValueChange={setBudget}
                min={30000}
                max={500000}
                step={10000}
                className="mt-4"
              />
            </div>

            <div>
              <Label className="text-lg font-semibold mb-4 block">
                🎯 Тип отдыха
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {categories.map(cat => (
                  <Button
                    key={cat.id}
                    variant={selectedCategories.includes(cat.id) ? 'default' : 'outline'}
                    onClick={() => toggleCategory(cat.id)}
                    className="h-auto py-4 flex flex-col gap-2"
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <span className="text-sm">{cat.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-lg font-semibold mb-4 block">
                📅 Месяц поездки
              </Label>
              <div className="grid grid-cols-3 gap-3">
                {months.map(month => (
                  <Button
                    key={month.id}
                    variant={selectedMonth === month.id ? 'default' : 'outline'}
                    onClick={() => setSelectedMonth(selectedMonth === month.id ? '' : month.id)}
                    className="py-6"
                  >
                    {month.label}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-lg font-semibold mb-4 block">
                ✈️ Тип перелета
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={flightType === 'direct' ? 'default' : 'outline'}
                  onClick={() => setFlightType(flightType === 'direct' ? '' : 'direct')}
                  className="py-6"
                >
                  <Icon name="Plane" size={18} className="mr-2" />
                  Прямой рейс
                </Button>
                <Button
                  variant={flightType === 'transfer' ? 'default' : 'outline'}
                  onClick={() => setFlightType(flightType === 'transfer' ? '' : 'transfer')}
                  className="py-6"
                >
                  <Icon name="Plane" size={18} className="mr-2" />
                  С пересадкой
                </Button>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSearch}
                size="lg"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-lg py-6"
              >
                <Icon name="Search" size={20} className="mr-2" />
                Найти туры ({allTours.filter(tour => {
                  const priceMatch = tour.price >= budget[0] && tour.price <= budget[1];
                  const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(tour.category);
                  const monthMatch = !selectedMonth || tour.dates.toLowerCase().includes(selectedMonth);
                  const flightMatch = !flightType || tour.fromSpb === flightType;
                  return priceMatch && categoryMatch && monthMatch && flightMatch;
                }).length})
              </Button>
              <Button
                onClick={resetFilters}
                size="lg"
                variant="outline"
                className="text-lg py-6"
              >
                <Icon name="RotateCcw" size={20} />
              </Button>
            </div>
          </CardContent>
        </Card>

        {showResults && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Найдено туров: {foundTours.length}
            </h3>
            {foundTours.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {foundTours.slice(0, 9).map(tour => (
                  <Card key={tour.id} className="hover:shadow-xl transition-shadow">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <Icon name="MapPin" size={16} />
                        <span>{tour.country}</span>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{tour.title}</h3>
                      <div className="flex items-center gap-1 mb-3 text-yellow-500">
                        {Array.from({ length: tour.stars }).map((_, i) => (
                          <Icon key={i} name="Star" size={14} className="fill-current" />
                        ))}
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-600">{tour.duration}</span>
                        <Badge variant={tour.fromSpb === 'direct' ? 'default' : 'secondary'}>
                          {tour.fromSpb === 'direct' ? 'Прямой' : 'С пересадкой'}
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold text-primary mb-3">
                        {tour.price.toLocaleString('ru-RU')} ₽
                      </div>
                      <Button className="w-full">
                        Подробнее
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon name="Frown" size={64} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">
                  По вашим критериям туры не найдены. Попробуйте изменить фильтры.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default TourFinderForm;
