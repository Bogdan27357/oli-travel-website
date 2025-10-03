import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const promotions = [
  { id: 1, title: 'Раннее бронирование', discount: '-30%', description: 'Скидка на туры летнего сезона 2025', validUntil: '31.12.2024' },
  { id: 2, title: 'Горящие туры', discount: '-50%', description: 'Вылет в ближайшие 7 дней', validUntil: '10.10.2024' },
  { id: 3, title: 'Семейный отдых', discount: '-20%', description: 'При бронировании для 2 взрослых + 2 детей', validUntil: '31.10.2024' }
];

export default function PromotionsSection() {
  return (
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
  );
}
