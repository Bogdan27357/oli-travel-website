import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const hotels = [
  {
    id: 1,
    name: 'Rixos Premium Belek',
    location: 'Турция, Белек',
    rating: 5,
    price: 45000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop',
    features: ['Все включено', 'Собственный пляж', 'SPA']
  },
  {
    id: 2,
    name: 'Atlantis The Palm',
    location: 'ОАЭ, Дубай',
    rating: 5,
    price: 85000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop',
    features: ['Аквапарк', 'Ресторан', 'Океанариум']
  },
  {
    id: 3,
    name: 'The Slate Phuket',
    location: 'Таиланд, Пхукет',
    rating: 5,
    price: 58000,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop',
    features: ['Спа', 'Бассейн', 'Фитнес']
  }
];

export default function HotelsSection() {
  return (
    <section id="hotels" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Лучшие отели
          </h2>
          <p className="text-gray-600 text-lg">Проверенные отели с высоким рейтингом</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel, idx) => (
            <Card 
              key={hotel.id} 
              className="overflow-hidden group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 animate-scale-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={hotel.image} 
                  alt={hotel.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                  <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-sm">{hotel.rating}.0</span>
                </div>
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
                <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
                  <Icon name="MapPin" size={14} />
                  {hotel.location}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {hotel.features.map((feature, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary text-xs rounded-full font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-sm text-gray-500">от</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {hotel.price.toLocaleString()} ₽
                    </p>
                  </div>
                  <Button className="bg-gradient-to-r from-primary to-yellow-500 hover:shadow-xl transition-all duration-300 hover:scale-105">
                    Забронировать
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
