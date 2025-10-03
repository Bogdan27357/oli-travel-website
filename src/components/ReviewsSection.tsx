import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import ReviewForm from '@/components/ReviewForm';

const reviews = [
  { 
    id: 1, 
    name: 'Анна Петрова', 
    rating: 5, 
    text: 'Летали семьёй в Турцию через OliTravel. Всё было организовано на высшем уровне! Отель Rixos Premium Belek превзошёл все ожидания. Отдельное спасибо менеджеру Олесе за терпение и подробные консультации.', 
    date: '20.09.2024',
    tour: 'Турция, Белек'
  },
  { 
    id: 2, 
    name: 'Дмитрий Смирнов', 
    rating: 5, 
    text: 'Поездка в Дубай была просто невероятной! Все трансферы вовремя, отель шикарный, экскурсии организованы отлично. Цена оказалась даже ниже, чем у конкурентов. Обязательно вернёмся за новыми турами!', 
    date: '15.09.2024',
    tour: 'ОАЭ, Дубай'
  },
  { 
    id: 3, 
    name: 'Елена Иванова', 
    rating: 5, 
    text: 'Мальдивы — это мечта, которая сбылась благодаря OliTravel! Остров, виллы над водой, сервис на высоте. Всё прошло гладко от вылета до возвращения домой. Рекомендую всем!', 
    date: '10.09.2024',
    tour: 'Мальдивы'
  },
  { 
    id: 4, 
    name: 'Сергей Козлов', 
    rating: 5, 
    text: 'Ездили в Египет, Хургада. Отель чистый, море тёплое, всё включено работало отлично. Прямой рейс из Пулково — очень удобно! Спасибо за организацию, всё понравилось.', 
    date: '05.09.2024',
    tour: 'Египет, Хургада'
  },
  { 
    id: 5, 
    name: 'Мария Соколова', 
    rating: 5, 
    text: 'Отдыхали с мужем в Таиланде. Остров Пхукет невероятно красивый! Экскурсии, пляжи, еда — всё на высоте. OliTravel помог с визой и всеми документами. Очень довольны!', 
    date: '01.09.2024',
    tour: 'Таиланд, Пхукет'
  },
  { 
    id: 6, 
    name: 'Алексей Волков', 
    rating: 5, 
    text: 'Греция, Крит — просто сказка! Отель с видом на море, вкусная кухня, много экскурсий. Менеджер помог выбрать идеальные даты и отель. Всё чётко, без проблем. Спасибо большое!', 
    date: '28.08.2024',
    tour: 'Греция, Крит'
  }
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <Card 
              key={review.id} 
              className="p-6 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white animate-fade-in"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Icon key={i} name="Star" size={18} className="text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <Icon name="Quote" size={28} className="text-primary/20" />
              </div>
              
              <p className="text-gray-700 mb-4 leading-relaxed text-sm">"{review.text}"</p>
              
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{review.name}</p>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-primary font-medium">{review.tour}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12 space-y-6">
          <ReviewForm />
          
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full">
            <Icon name="Users" size={20} className="text-primary" />
            <span className="text-sm font-medium">Более 2000 довольных туристов за 2024 год</span>
          </div>
        </div>
      </div>
    </section>
  );
}