import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { hotDeals } from '@/data/hotDeals';
import { useToast } from '@/hooks/use-toast';
import OptimizedImage from '@/components/ui/optimized-image';

const HotDealsSection = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState<'all' | 'hot' | 'early' | 'last-minute'>('all');

  const filteredDeals = filter === 'all' 
    ? hotDeals 
    : hotDeals.filter(deal => deal.dealType === filter);

  const handleBookDeal = (dealTitle: string) => {
    toast({
      title: "Отличный выбор! 🔥",
      description: `Менеджер свяжется с вами для бронирования тура "${dealTitle}"`,
    });
  };

  const getDealBadge = (type: string) => {
    switch(type) {
      case 'hot':
        return <Badge className="bg-red-500 hover:bg-red-600">🔥 Горящий</Badge>;
      case 'last-minute':
        return <Badge className="bg-orange-500 hover:bg-orange-600">⚡ Last Minute</Badge>;
      case 'early':
        return <Badge className="bg-blue-500 hover:bg-blue-600">🎯 Раннее</Badge>;
      default:
        return null;
    }
  };

  const getTimeRemaining = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    if (days <= 0) return 'Истекает сегодня!';
    if (days === 1) return 'Остался 1 день';
    if (days <= 4) return `Осталось ${days} дня`;
    return `Осталось ${days} дней`;
  };

  return (
    <section id="hot-deals" className="py-20 bg-gradient-to-b from-red-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full mb-4">
            <Icon name="Flame" size={20} />
            <span className="font-semibold">Горящие предложения</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Акции и спецпредложения
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Успейте забронировать туры по выгодным ценам! Скидки до 40%
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className="rounded-full"
          >
            Все предложения
          </Button>
          <Button
            variant={filter === 'hot' ? 'default' : 'outline'}
            onClick={() => setFilter('hot')}
            className="rounded-full"
          >
            🔥 Горящие туры
          </Button>
          <Button
            variant={filter === 'last-minute' ? 'default' : 'outline'}
            onClick={() => setFilter('last-minute')}
            className="rounded-full"
          >
            ⚡ Last Minute
          </Button>
          <Button
            variant={filter === 'early' ? 'default' : 'outline'}
            onClick={() => setFilter('early')}
            className="rounded-full"
          >
            🎯 Раннее бронирование
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.map((deal) => (
            <Card key={deal.id} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-red-100">
              <div className="relative">
                <OptimizedImage
                  src={deal.image} 
                  alt={deal.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  {getDealBadge(deal.dealType)}
                </div>
                <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full font-bold text-lg">
                  -{deal.discount}%
                </div>
                <div className="absolute bottom-3 right-3 bg-white/95 px-3 py-1 rounded-full text-sm font-semibold text-red-600 flex items-center gap-1">
                  <Icon name="Clock" size={14} />
                  {getTimeRemaining(deal.expiresAt)}
                </div>
              </div>

              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Icon name="MapPin" size={16} />
                  <span>{deal.country}, {deal.city}</span>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {deal.title}
                </h3>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1 text-yellow-500">
                    {Array.from({ length: deal.stars }).map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{deal.hotel}</span>
                </div>

                <div className="flex items-center gap-4 text-sm mb-3">
                  <div className="flex items-center gap-1">
                    <Icon name="Calendar" size={16} className="text-gray-500" />
                    <span>{deal.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Plane" size={16} className="text-gray-500" />
                    <span>{deal.fromSpb === 'direct' ? 'Прямой' : 'С пересадкой'}</span>
                  </div>
                </div>

                <div className="text-sm text-gray-600 mb-3">
                  <div className="font-semibold mb-1">Даты вылета:</div>
                  <div>{deal.dates}</div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {deal.includes.slice(0, 3).map((item, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>

                <div className="bg-red-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-500 line-through">
                      {deal.originalPrice.toLocaleString('ru-RU')} ₽
                    </span>
                    <Badge variant="destructive" className="text-xs">
                      Экономия {(deal.originalPrice - deal.discountPrice).toLocaleString('ru-RU')} ₽
                    </Badge>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-red-600">
                      {deal.discountPrice.toLocaleString('ru-RU')} ₽
                    </span>
                    <span className="text-sm text-gray-600">за двоих</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-orange-600 text-sm font-semibold">
                    <Icon name="Users" size={16} />
                    Осталось {deal.limitedSeats} мест
                  </div>
                </div>

                <Button 
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold"
                  onClick={() => handleBookDeal(deal.title)}
                >
                  <Icon name="Zap" size={18} className="mr-2" />
                  Забронировать со скидкой
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDeals.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">Нет доступных предложений по выбранному фильтру</p>
          </div>
        )}

        <div className="mt-12 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-3">🔔 Подпишитесь на рассылку горящих туров</h3>
          <p className="text-white/90 mb-6">
            Получайте эксклюзивные предложения и скидки до 50% на email
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Ваш email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <Button className="bg-white text-red-600 hover:bg-gray-100 font-semibold px-8">
              Подписаться
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotDealsSection;