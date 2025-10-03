import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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

  const benefits = [
    { icon: 'Plane', title: 'Прямые рейсы', description: 'Из Санкт-Петербурга' },
    { icon: 'Clock', title: 'Быстрое бронирование', description: 'За 5 минут' },
    { icon: 'Shield', title: 'Гарантия', description: 'Возврат денег' },
    { icon: 'Headphones', title: 'Поддержка 24/7', description: 'Всегда на связи' }
  ];

  const tours = [
    { id: 1, name: 'Пляжный отдых', duration: '7-14 дней', price: 35000, icon: 'Waves' },
    { id: 2, name: 'Экскурсионные туры', duration: '5-10 дней', price: 45000, icon: 'Camera' },
    { id: 3, name: 'Горнолыжные курорты', duration: '7-10 дней', price: 55000, icon: 'Mountain' },
    { id: 4, name: 'Экзотика', duration: '10-14 дней', price: 75000, icon: 'Palmtree' }
  ];

  const countries = [
    { name: 'Турция', tours: 156, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400' },
    { name: 'ОАЭ', tours: 89, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400' },
    { name: 'Таиланд', tours: 112, image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=400' },
    { name: 'Египет', tours: 134, image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=400' },
    { name: 'Мальдивы', tours: 67, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400' },
    { name: 'Греция', tours: 98, image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400' }
  ];

  const reviews = [
    { id: 1, name: 'Анна Петрова', rating: 5, text: 'Отличный сервис! Отдохнули в Турции, все было организовано на высшем уровне.', date: '15.09.2024' },
    { id: 2, name: 'Дмитрий Смирнов', rating: 5, text: 'Поездка в Дубай превзошла все ожидания. Спасибо команде OliTravel!', date: '10.09.2024' },
    { id: 3, name: 'Елена Иванова', rating: 5, text: 'Прекрасный отдых на Мальдивах. Все было идеально!', date: '05.09.2024' }
  ];

  const promotions = [
    { id: 1, title: 'Раннее бронирование', discount: '-30%', description: 'Скидка на туры летнего сезона 2025', validUntil: '31.12.2024' },
    { id: 2, title: 'Горящие туры', discount: '-50%', description: 'Вылет в ближайшие 7 дней', validUntil: '10.10.2024' },
    { id: 3, title: 'Семейный отдых', discount: '-20%', description: 'При бронировании для 2 взрослых + 2 детей', validUntil: '31.10.2024' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 animate-fade-in">
              <img src="/img/a6646f57-0a66-476a-9d43-6a33fed933cb.jpg" alt="OliTravel" className="h-12 w-12 object-contain" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                OliTravel
              </span>
            </div>
            
            <nav className="hidden lg:flex items-center gap-2">
              {[
                { id: 'home', label: 'Главная' },
                { id: 'tours', label: 'Туры' },
                { id: 'countries', label: 'Страны' },
                { id: 'hotels', label: 'Отели' },
                { id: 'about', label: 'О нас' },
                { id: 'reviews', label: 'Отзывы' },
                { id: 'promotions', label: 'Акции' },
                { id: 'contacts', label: 'Контакты' }
              ].map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                  }`}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <Button className="hidden md:block bg-gradient-to-r from-primary to-secondary hover:shadow-xl transition-all duration-300 hover:scale-105">
              Связаться
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-yellow-500 to-secondary bg-clip-text text-transparent leading-tight">
                Discover Your Journey
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-10">
                Откройте мир вместе с OliTravel — туры из Санкт-Петербурга по лучшим ценам
              </p>
              <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <Button size="lg" className="bg-gradient-to-r from-primary to-yellow-500 hover:shadow-2xl transition-all duration-300 hover:scale-110 text-lg px-8 py-6">
                  <Icon name="Search" className="mr-2" size={20} />
                  Подобрать тур
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-300 hover:scale-110 text-lg px-8 py-6">
                  <Icon name="Calendar" className="mr-2" size={20} />
                  Горящие туры
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {benefits.map((benefit, idx) => (
                <Card 
                  key={idx} 
                  className="p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-white to-gray-50 animate-scale-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
                    <Icon name={benefit.icon as any} size={32} className="text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

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

        <section id="about" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                О нас
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                OliTravel — ваш надежный партнер в мире путешествий с 2010 года
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="p-8 text-center border-0 bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">14+</div>
                <p className="text-gray-600 font-medium">лет на рынке</p>
              </Card>
              <Card className="p-8 text-center border-0 bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">50K+</div>
                <p className="text-gray-600 font-medium">довольных клиентов</p>
              </Card>
              <Card className="p-8 text-center border-0 bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">120+</div>
                <p className="text-gray-600 font-medium">направлений</p>
              </Card>
            </div>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Мы специализируемся на организации незабываемых путешествий из Санкт-Петербурга. 
                Наша команда профессионалов поможет подобрать идеальный тур, учитывая все ваши пожелания и бюджет.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                С нами вы получаете гарантию качества, лучшие цены и круглосуточную поддержку на всех этапах путешествия.
              </p>
            </div>
          </div>
        </section>

        <section id="reviews" className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Отзывы клиентов
              </h2>
              <p className="text-gray-600 text-lg">Что говорят о нас наши туристы</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {reviews.map((review, idx) => (
                <Card 
                  key={review.id} 
                  className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={20} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic leading-relaxed">"{review.text}"</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="font-bold text-gray-900">{review.name}</p>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                    <Icon name="Quote" size={32} className="text-primary/20" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="promotions" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Актуальные акции
              </h2>
              <p className="text-gray-600 text-lg">Специальные предложения для вас</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {promotions.map((promo, idx) => (
                <Card 
                  key={promo.id} 
                  className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group cursor-pointer"
                >
                  <div className="bg-gradient-to-br from-primary to-secondary p-8 text-white text-center">
                    <div className="text-6xl font-bold mb-2">{promo.discount}</div>
                    <p className="text-xl font-semibold">{promo.title}</p>
                  </div>
                  <div className="p-6 bg-white">
                    <p className="text-gray-600 mb-4">{promo.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Icon name="Clock" size={16} />
                      <span>Действует до {promo.validUntil}</span>
                    </div>
                    <Button className="w-full mt-6 bg-gradient-to-r from-primary to-secondary group-hover:shadow-xl transition-all">
                      Подробнее
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contacts" className="py-20 bg-gradient-to-br from-primary via-yellow-500 to-secondary text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDEzNGgxMnYxMkgzNnptNDggNDhoMTJ2MTJIODR6bTAsLTQ4aDEydjEySDg0em0tNDggMGgxMnYxMkg0OHoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Готовы к путешествию мечты?
            </h2>
            <p className="text-xl mb-10 opacity-95 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Оставьте заявку и наш менеджер свяжется с вами в течение 15 минут
            </p>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100 shadow-2xl transition-all duration-300 hover:scale-110 text-lg px-10 py-7 animate-scale-in"
              style={{ animationDelay: '200ms' }}
            >
              <Icon name="Phone" className="mr-2" size={20} />
              Получить консультацию
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/img/a6646f57-0a66-476a-9d43-6a33fed933cb.jpg" alt="OliTravel" className="h-10 w-10 object-contain" />
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  OliTravel
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Туры из Санкт-Петербурга по всему миру
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Направления</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Турция</li>
                <li className="hover:text-white transition-colors cursor-pointer">ОАЭ</li>
                <li className="hover:text-white transition-colors cursor-pointer">Таиланд</li>
                <li className="hover:text-white transition-colors cursor-pointer">Египет</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">О нас</li>
                <li className="hover:text-white transition-colors cursor-pointer">Контакты</li>
                <li className="hover:text-white transition-colors cursor-pointer">Отзывы</li>
                <li className="hover:text-white transition-colors cursor-pointer">Вакансии</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (812) 123-45-67
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@olitravel.ru
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  Санкт-Петербург
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 OliTravel. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;