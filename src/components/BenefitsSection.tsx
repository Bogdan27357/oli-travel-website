import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const benefits = [
  { icon: 'Plane', title: 'Прямые рейсы', description: 'Из Пулково без пересадок', color: 'from-blue-500 to-blue-600' },
  { icon: 'BadgePercent', title: 'Лучшие цены', description: 'Вернём разницу, если найдёте дешевле', color: 'from-green-500 to-green-600' },
  { icon: 'CreditCard', title: 'Рассрочка 0%', description: 'Без переплат до 12 месяцев', color: 'from-pink-500 to-pink-600' },
  { icon: 'Headphones', title: 'Поддержка 24/7', description: 'ИИ-помощник + живой менеджер', color: 'from-orange-500 to-orange-600' },
  { icon: 'Globe', title: '177 отелей', description: 'В 11 странах мира', color: 'from-teal-500 to-teal-600' },
  { icon: 'Award', title: '15 лет опыта', description: 'С 2009 года помогаем путешествовать', color: 'from-yellow-500 to-yellow-600' }
];

export default function BenefitsSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Почему выбирают нас
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Мы создаём незабываемые путешествия с заботой о каждой детали
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {benefits.map((benefit, idx) => (
            <Card 
              key={idx} 
              className="p-4 md:p-6 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 bg-white cursor-pointer group animate-fade-in"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className={`w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-gradient-to-br ${benefit.color} rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={benefit.icon as any} size={28} className="text-white" />
              </div>
              <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-xs md:text-sm">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}