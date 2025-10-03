import { Card } from '@/components/ui/card';

const countries = [
  { name: 'Турция', tours: 156, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400' },
  { name: 'ОАЭ', tours: 89, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400' },
  { name: 'Таиланд', tours: 112, image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=400' },
  { name: 'Египет', tours: 134, image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=400' },
  { name: 'Мальдивы', tours: 67, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400' },
  { name: 'Греция', tours: 98, image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400' }
];

export default function CountriesSection() {
  return (
    <section id="countries" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Популярные страны
          </h2>
          <p className="text-gray-600 text-lg">Прямые рейсы из Санкт-Петербурга</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {countries.map((country, idx) => (
            <Card 
              key={idx} 
              className="overflow-hidden group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="relative h-32 overflow-hidden">
                <img 
                  src={country.image} 
                  alt={country.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <h3 className="font-bold text-sm mb-0.5">{country.name}</h3>
                  <p className="text-xs opacity-90">{country.tours} туров</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
