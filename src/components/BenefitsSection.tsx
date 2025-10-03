import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const benefits = [
  { icon: 'Plane', title: 'Прямые рейсы', description: 'Из Санкт-Петербурга' },
  { icon: 'Clock', title: 'Быстрое бронирование', description: 'За 5 минут' },
  { icon: 'Shield', title: 'Гарантия', description: 'Возврат денег' },
  { icon: 'Headphones', title: 'Поддержка 24/7', description: 'Всегда на связи' }
];

export default function BenefitsSection() {
  return (
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
  );
}
