import Icon from '@/components/ui/icon';

const destinations = [
  {
    country: 'Турция',
    city: 'Анталья',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800',
    price: 'от 35,000₽',
    duration: '7 ночей',
    rating: 4.8,
    tours: 156,
    features: ['Пляжи', 'Все включено', 'Аквапарки']
  },
  {
    country: 'ОАЭ',
    city: 'Дубай',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    price: 'от 55,000₽',
    duration: '5 ночей',
    rating: 4.9,
    tours: 98,
    features: ['Шоппинг', 'Небоскребы', 'Пустыня']
  },
  {
    country: 'Египет',
    city: 'Хургада',
    image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800',
    price: 'от 40,000₽',
    duration: '7 ночей',
    rating: 4.7,
    tours: 203,
    features: ['Дайвинг', 'Пляжи', 'Пирамиды']
  },
  {
    country: 'Таиланд',
    city: 'Пхукет',
    image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800',
    price: 'от 60,000₽',
    duration: '10 ночей',
    rating: 4.9,
    tours: 124,
    features: ['Острова', 'Экзотика', 'Храмы']
  },
  {
    country: 'Греция',
    city: 'Крит',
    image: 'https://images.unsplash.com/photo-1601581987809-a874a81309c9?w=800',
    price: 'от 50,000₽',
    duration: '7 ночей',
    rating: 4.8,
    tours: 87,
    features: ['История', 'Море', 'Кухня']
  },
  {
    country: 'Мальдивы',
    city: 'Мале',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
    price: 'от 120,000₽',
    duration: '7 ночей',
    rating: 5.0,
    tours: 45,
    features: ['Бунгало', 'Рай', 'Романтика']
  }
];

export default function PopularDestinationsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Icon name="TrendingUp" size={16} />
            Популярные направления
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            🌍 Куда полететь в этом сезоне?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Топ-6 направлений с лучшими ценами и отзывами
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:scale-105"
            >
              {/* Изображение */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.city}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Градиент оверлей */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                {/* Рейтинг */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg flex items-center gap-1">
                  <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-sm">{dest.rating}</span>
                </div>

                {/* Страна и город */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-white/90 text-sm font-semibold mb-1">{dest.country}</div>
                  <h3 className="text-white text-3xl font-bold">{dest.city}</h3>
                </div>
              </div>

              {/* Контент */}
              <div className="p-6">
                {/* Фичи */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {dest.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Информация */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Icon name="Calendar" size={14} />
                    <span>{dest.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="MapPin" size={14} />
                    <span>{dest.tours} туров</span>
                  </div>
                </div>

                {/* Цена и кнопка */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <div className="text-sm text-gray-500">Туры от</div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {dest.price}
                    </div>
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
                    Выбрать
                    <Icon name="ArrowRight" size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button className="px-8 py-4 bg-white border-2 border-primary text-primary rounded-xl font-bold text-lg hover:bg-primary hover:text-white transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-xl">
            Смотреть все направления
            <Icon name="Globe" size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
