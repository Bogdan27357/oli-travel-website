import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const tours = [
  { id: 1, name: 'Пляжный отдых', duration: '7-14 дней', price: 35000, icon: 'Waves' },
  { id: 2, name: 'Экскурсионные туры', duration: '5-10 дней', price: 45000, icon: 'Camera' },
  { id: 3, name: 'Горнолыжные курорты', duration: '7-10 дней', price: 55000, icon: 'Mountain' },
  { id: 4, name: 'Экзотика', duration: '10-14 дней', price: 75000, icon: 'Palmtree' }
];

export default function ToursSection() {
  return (
    <section id="tours" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Виды туров
          </h2>
          <p className="text-gray-600 text-lg">Выберите идеальный формат отдыха</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {tours.map((tour, idx) => (
            <Card 
              key={tour.id} 
              className="p-8 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-white to-gray-50 cursor-pointer group"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <Icon name={tour.icon as any} size={40} className="text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3">{tour.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{tour.duration}</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                от {tour.price.toLocaleString()} ₽
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
