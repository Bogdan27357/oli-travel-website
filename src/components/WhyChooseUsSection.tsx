import Icon from '@/components/ui/icon';

const reasons = [
  {
    icon: 'Award',
    title: '15 лет на рынке',
    description: 'Надежный туроператор с безупречной репутацией',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: 'Users',
    title: '50,000+ клиентов',
    description: 'Довольных туристов выбрали нас',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: 'Globe',
    title: '120+ направлений',
    description: 'Туры в любую точку мира',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: 'Shield',
    title: '100% гарантия',
    description: 'Страхование и возврат средств',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: 'DollarSign',
    title: 'Лучшие цены',
    description: 'Работаем напрямую с отелями',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: 'Headphones',
    title: '24/7 поддержка',
    description: 'Всегда на связи во время вашего отдыха',
    color: 'from-indigo-500 to-purple-500'
  }
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Декоративный фон */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Icon name="Star" size={16} />
            Почему мы?
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Почему выбирают <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Oli Travel</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Мы создаем незабываемые путешествия с 2009 года
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Градиентный фон при наведении */}
              <div className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                {/* Иконка */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${reason.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                  <Icon name={reason.icon as any} size={32} className="text-white" />
                </div>

                {/* Контент */}
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {reason.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {reason.description}
                </p>

                {/* Декоративная линия */}
                <div className={`mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r ${reason.color} transition-all duration-500 rounded-full`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Дополнительная информация */}
        <div className="mt-16 bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">15</div>
              <div className="text-white/90">лет опыта</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50K+</div>
              <div className="text-white/90">клиентов</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">120+</div>
              <div className="text-white/90">направлений</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">99.8%</div>
              <div className="text-white/90">положительных отзывов</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
