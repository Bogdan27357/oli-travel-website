import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const levels = [
  {
    name: 'Бронза',
    threshold: '0 - 100,000₽',
    discount: '3%',
    color: 'from-orange-600 to-amber-600',
    icon: 'Award',
    benefits: ['Кэшбэк 3%', 'Приоритетная поддержка', 'Скидки партнеров']
  },
  {
    name: 'Серебро',
    threshold: '100,000 - 300,000₽',
    discount: '5%',
    color: 'from-gray-400 to-gray-600',
    icon: 'Medal',
    benefits: ['Кэшбэк 5%', 'Ранний доступ к турам', 'Бесплатные трансферы']
  },
  {
    name: 'Золото',
    threshold: '300,000 - 500,000₽',
    discount: '7%',
    color: 'from-yellow-400 to-yellow-600',
    icon: 'Crown',
    benefits: ['Кэшбэк 7%', 'Персональный менеджер', 'Апгрейд номера']
  },
  {
    name: 'Платина',
    threshold: 'от 500,000₽',
    discount: '10%',
    color: 'from-purple-500 to-pink-600',
    icon: 'Gem',
    benefits: ['Кэшбэк 10%', 'VIP лаунж', 'Эксклюзивные туры']
  }
];

const bonuses = [
  {
    icon: 'Gift',
    title: 'Бонусы за покупки',
    description: 'Получайте до 10% кэшбэка на бонусный счет'
  },
  {
    icon: 'Users',
    title: 'Приведи друга',
    description: 'Получите 5,000₽ за каждого друга'
  },
  {
    icon: 'Calendar',
    title: 'Бонус в день рождения',
    description: 'Скидка 10% на тур в месяц рождения'
  },
  {
    icon: 'Repeat',
    title: 'Кэшбэк за отзыв',
    description: '1,000₽ на счет за развернутый отзыв'
  }
];

export default function LoyaltyProgramSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Icon name="Sparkles" size={16} />
            Программа лояльности
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            🎁 Зарабатывайте на путешествиях
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Получайте кэшбэк и эксклюзивные привилегии за каждую покупку
          </p>
        </div>

        {/* Уровни программы */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {levels.map((level, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:scale-105"
            >
              {/* Градиентный фон */}
              <div className={`absolute inset-0 bg-gradient-to-br ${level.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
              
              <div className="relative z-10">
                {/* Иконка */}
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${level.color} flex items-center justify-center shadow-lg`}>
                  <Icon name={level.icon as any} size={32} className="text-white" />
                </div>

                {/* Название уровня */}
                <h3 className="text-2xl font-bold text-center mb-2">{level.name}</h3>
                
                {/* Порог */}
                <div className="text-sm text-gray-500 text-center mb-4">{level.threshold}</div>

                {/* Скидка */}
                <div className={`text-center mb-4 p-3 rounded-xl bg-gradient-to-r ${level.color} text-white font-bold text-xl`}>
                  Кэшбэк {level.discount}
                </div>

                {/* Преимущества */}
                <ul className="space-y-2">
                  {level.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <Icon name="Check" size={16} className="text-green-500 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Дополнительные бонусы */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-center mb-8">Дополнительные бонусы</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {bonuses.map((bonus, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center border border-gray-100 hover:border-purple-200"
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Icon name={bonus.icon as any} size={28} className="text-white" />
                </div>
                <h4 className="font-bold mb-2">{bonus.title}</h4>
                <p className="text-sm text-gray-600">{bonus.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA блок */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <Icon name="Sparkles" size={64} className="mx-auto mb-6" />
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Присоединяйтесь к программе лояльности
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Начните экономить на путешествиях уже сегодня! Регистрация бесплатная.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-purple-600 hover:bg-gray-100 font-bold text-lg px-8 py-6">
                <Icon name="UserPlus" size={20} className="mr-2" />
                Зарегистрироваться
              </Button>
              <Button className="bg-purple-800 hover:bg-purple-900 text-white font-bold text-lg px-8 py-6 border-2 border-white/20">
                <Icon name="Info" size={20} className="mr-2" />
                Узнать больше
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle" size={16} />
                <span>Бесплатно</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle" size={16} />
                <span>Без комиссий</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle" size={16} />
                <span>Мгновенное начисление</span>
              </div>
            </div>
          </div>
        </div>

        {/* Калькулятор бонусов */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold text-center mb-6">💰 Калькулятор бонусов</h3>
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-2">Стоимость тура</label>
                <input
                  type="number"
                  placeholder="100000"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-2">Ваш уровень</label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none">
                  <option>Бронза (3%)</option>
                  <option>Серебро (5%)</option>
                  <option>Золото (7%)</option>
                  <option>Платина (10%)</option>
                </select>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 text-center">
              <div className="text-sm text-gray-600 mb-2">Вы получите бонусов:</div>
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                3,000₽
              </div>
              <div className="text-sm text-gray-500 mt-2">Можно использовать при следующей покупке</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
