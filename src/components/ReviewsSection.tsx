import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const reviews = [
  { id: 1, name: 'Анна Петрова', rating: 5, text: 'Отличный сервис! Отдохнули в Турции, все было организовано на высшем уровне.', date: '15.09.2024' },
  { id: 2, name: 'Дмитрий Смирнов', rating: 5, text: 'Поездка в Дубай превзошла все ожидания. Спасибо команде OliTravel!', date: '10.09.2024' },
  { id: 3, name: 'Елена Иванова', rating: 5, text: 'Прекрасный отдых на Мальдивах. Все было идеально!', date: '05.09.2024' }
];

export default function ReviewsSection() {
  return (
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
  );
}
