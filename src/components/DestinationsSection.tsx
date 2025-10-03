import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const destinations = [
  {
    id: 1,
    country: 'Турция',
    city: 'Анталья',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&auto=format&fit=crop',
    price: 35000,
    description: 'Пляжный отдых на берегу Средиземного моря'
  },
  {
    id: 2,
    country: 'ОАЭ',
    city: 'Дубай',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop',
    price: 65000,
    description: 'Роскошь и современность в сердце пустыни'
  },
  {
    id: 3,
    country: 'Таиланд',
    city: 'Пхукет',
    image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&auto=format&fit=crop',
    price: 55000,
    description: 'Экзотические пляжи и тропические приключения'
  },
  {
    id: 4,
    country: 'Египет',
    city: 'Шарм-эль-Шейх',
    image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800&auto=format&fit=crop',
    price: 42000,
    description: 'Красное море и коралловые рифы'
  }
];

export default function DestinationsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Популярные направления
          </h2>
          <p className="text-gray-600 text-lg">Города и курорты</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, idx) => (
            <Card 
              key={dest.id} 
              className="overflow-hidden group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={dest.image} 
                  alt={dest.city} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl font-bold mb-1">{dest.city}</h3>
                  <p className="text-sm opacity-90">{dest.country}</p>
                </div>
              </div>
              <div className="p-5 bg-white">
                <p className="text-gray-600 mb-4 text-sm">{dest.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">от</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {dest.price.toLocaleString()} ₽
                    </p>
                  </div>
                  <Button className="bg-gradient-to-r from-secondary to-primary hover:shadow-xl transition-all duration-300 hover:scale-105">
                    Выбрать
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
