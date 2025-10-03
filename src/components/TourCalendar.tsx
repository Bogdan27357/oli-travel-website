import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { allTours } from '@/data/tours';

interface TourDate {
  country: string;
  month: string;
  tours: number;
  minPrice: number;
  category: string;
}

const TourCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('октябрь');

  const months = [
    { name: 'октябрь', label: 'Октябрь 2025', icon: '🍂' },
    { name: 'ноябрь', label: 'Ноябрь 2025', icon: '🍁' },
    { name: 'декабрь', label: 'Декабрь 2025', icon: '❄️' }
  ];

  const getToursByMonth = (month: string): TourDate[] => {
    const monthMap: { [key: string]: string } = {
      'октябрь': 'октября',
      'ноябрь': 'ноября',
      'декабрь': 'декабря'
    };

    const searchMonth = monthMap[month];
    const countryData: { [key: string]: { tours: any[], minPrice: number, category: string } } = {};

    allTours.forEach(tour => {
      if (tour.dates.toLowerCase().includes(searchMonth)) {
        if (!countryData[tour.country]) {
          countryData[tour.country] = {
            tours: [],
            minPrice: tour.price,
            category: tour.category
          };
        }
        countryData[tour.country].tours.push(tour);
        if (tour.price < countryData[tour.country].minPrice) {
          countryData[tour.country].minPrice = tour.price;
        }
      }
    });

    return Object.entries(countryData).map(([country, data]) => ({
      country,
      month,
      tours: data.tours.length,
      minPrice: data.minPrice,
      category: data.category
    }));
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'beach': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'exotic': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'excursion': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'ski': return 'bg-cyan-100 text-cyan-700 border-cyan-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'beach': return '🏖️';
      case 'exotic': return '🌴';
      case 'excursion': return '🏛️';
      case 'ski': return '⛷️';
      default: return '✈️';
    }
  };

  const currentData = getToursByMonth(selectedMonth);

  return (
    <section id="calendar" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full mb-4">
            <Icon name="Calendar" size={20} />
            <span className="font-semibold">Календарь туров</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Доступные даты вылетов
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Выберите месяц и узнайте, какие направления доступны для поездки
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {months.map((month) => (
            <Button
              key={month.name}
              variant={selectedMonth === month.name ? 'default' : 'outline'}
              onClick={() => setSelectedMonth(month.name)}
              className="text-lg px-8 py-6 rounded-xl"
              size="lg"
            >
              <span className="mr-2 text-xl">{month.icon}</span>
              {month.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentData.map((item, index) => (
            <Card 
              key={index} 
              className={`hover:shadow-xl transition-all duration-300 border-2 ${getCategoryColor(item.category)}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{getCategoryIcon(item.category)}</span>
                    <div>
                      <CardTitle className="text-xl">{item.country}</CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        {item.tours} {item.tours === 1 ? 'тур' : item.tours < 5 ? 'тура' : 'туров'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">От</span>
                    <span className="text-2xl font-bold text-primary">
                      {item.minPrice.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Icon name="Calendar" size={16} />
                    <span className="capitalize">{item.month} 2025</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {currentData.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Calendar" size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">
              На выбранный месяц туры не найдены
            </p>
          </div>
        )}

        <Card className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <Icon name="Plane" size={40} className="mx-auto mb-3" />
                <h3 className="text-2xl font-bold mb-2">70+</h3>
                <p className="text-white/90">направлений</p>
              </div>
              <div>
                <Icon name="MapPin" size={40} className="mx-auto mb-3" />
                <h3 className="text-2xl font-bold mb-2">25+</h3>
                <p className="text-white/90">стран</p>
              </div>
              <div>
                <Icon name="Calendar" size={40} className="mx-auto mb-3" />
                <h3 className="text-2xl font-bold mb-2">3</h3>
                <p className="text-white/90">месяца доступных дат</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-center">📅 Популярные месяцы по направлениям</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-orange-50 rounded-xl">
              <div className="text-4xl mb-3">🍂</div>
              <h4 className="font-bold text-lg mb-2">Октябрь</h4>
              <p className="text-sm text-gray-600 mb-3">Бархатный сезон</p>
              <div className="text-sm space-y-1">
                <div>🇹🇷 Турция • 🇪🇬 Египет</div>
                <div>🇹🇭 Таиланд • 🇻🇳 Вьетнам</div>
                <div>🇷🇺 Сочи • 🇬🇪 Абхазия</div>
              </div>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="text-4xl mb-3">🍁</div>
              <h4 className="font-bold text-lg mb-2">Ноябрь</h4>
              <p className="text-sm text-gray-600 mb-3">Сезон экзотики</p>
              <div className="text-sm space-y-1">
                <div>🇲🇻 Мальдивы • 🇦🇪 ОАЭ</div>
                <div>🇮🇩 Бали • 🇸🇨 Сейшелы</div>
                <div>🇱🇰 Шри-Ланка • 🇹🇿 Занзибар</div>
              </div>
            </div>

            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="text-4xl mb-3">❄️</div>
              <h4 className="font-bold text-lg mb-2">Декабрь</h4>
              <p className="text-sm text-gray-600 mb-3">Зима и Новый Год</p>
              <div className="text-sm space-y-1">
                <div>⛷️ Горные лыжи</div>
                <div>🇦🇪 ОАЭ • 🇨🇳 Хайнань</div>
                <div>🇨🇺 Куба • 🇩🇴 Доминикана</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-600 mb-4">
            💡 <strong>Совет:</strong> Бронируйте туры заранее, чтобы получить лучшие цены и выбор отелей
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Icon name="Phone" size={18} className="mr-2" />
            Получить консультацию
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TourCalendar;
