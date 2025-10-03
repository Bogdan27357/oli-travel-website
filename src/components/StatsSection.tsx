import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const stats = [
  { 
    icon: 'Users', 
    value: '10 000+', 
    label: 'Туристов отправили в путешествие',
    color: 'from-blue-500 to-blue-600'
  },
  { 
    icon: 'Hotel', 
    value: '177', 
    label: 'Отелей в 11 странах',
    color: 'from-green-500 to-green-600'
  },
  { 
    icon: 'Calendar', 
    value: '15 лет', 
    label: 'Опыта с 2009 года',
    color: 'from-purple-500 to-purple-600'
  },
  { 
    icon: 'Star', 
    value: '4.9/5', 
    label: 'Рейтинг по отзывам',
    color: 'from-yellow-500 to-yellow-600'
  }
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, idx) => (
            <Card 
              key={idx} 
              className="p-6 text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center shadow-lg`}>
                <Icon name={stat.icon as any} size={28} className="text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <p className="text-gray-600 text-sm md:text-base font-medium">{stat.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}