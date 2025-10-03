import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import ReviewForm from '@/components/ReviewForm';

const ADMIN_API_URL = 'https://functions.poehali.dev/2ebb973a-0dd8-4f3b-8168-e788b062dbef';

interface Review {
  id: number;
  author_name: string;
  author_avatar?: string;
  country: string;
  rating: number;
  comment: string;
  date: string;
  is_approved: boolean;
}

const fallbackReviews = [
  { 
    id: 1, 
    author_name: 'Анна Петрова', 
    rating: 5, 
    comment: 'Летали семьёй в Турцию через OliTravel. Всё было организовано на высшем уровне! Отель Rixos Premium Belek превзошёл все ожидания. Отдельное спасибо менеджеру Олесе за терпение и подробные консультации.', 
    date: '2024-09-20',
    country: 'Турция, Белек',
    is_approved: true
  },
  { 
    id: 2, 
    author_name: 'Дмитрий Смирнов', 
    rating: 5, 
    comment: 'Поездка в Дубай была просто невероятной! Все трансферы вовремя, отель шикарный, экскурсии организованы отлично. Цена оказалась даже ниже, чем у конкурентов. Обязательно вернёмся за новыми турами!', 
    date: '2024-09-15',
    country: 'ОАЭ, Дубай',
    is_approved: true
  },
  { 
    id: 3, 
    author_name: 'Елена Иванова', 
    rating: 5, 
    comment: 'Мальдивы — это мечта, которая сбылась благодаря OliTravel! Остров, виллы над водой, сервис на высоте. Всё прошло гладко от вылета до возвращения домой. Рекомендую всем!', 
    date: '2024-09-10',
    country: 'Мальдивы',
    is_approved: true
  },
  { 
    id: 4, 
    author_name: 'Сергей Козлов', 
    rating: 5, 
    comment: 'Ездили в Египет, Хургада. Отель чистый, море тёплое, всё включено работало отлично. Прямой рейс из Пулково — очень удобно! Спасибо за организацию, всё понравилось.', 
    date: '2024-09-05',
    country: 'Египет, Хургада',
    is_approved: true
  },
  { 
    id: 5, 
    author_name: 'Мария Соколова', 
    rating: 5, 
    comment: 'Отдыхали с мужем в Таиланде. Остров Пхукет невероятно красивый! Экскурсии, пляжи, еда — всё на высоте. OliTravel помог с визой и всеми документами. Очень довольны!', 
    date: '2024-09-01',
    country: 'Таиланд, Пхукет',
    is_approved: true
  },
  { 
    id: 6, 
    author_name: 'Алексей Волков', 
    rating: 5, 
    comment: 'Китай, Санья — невероятное место! Отель Atlantis Sanya с аквапарком и океанариумом. Дети в восторге! Менеджер помог с визой и всеми документами. Спасибо большое!', 
    date: '2024-08-28',
    country: 'Китай, Санья',
    is_approved: true
  }
];

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const response = await fetch(`${ADMIN_API_URL}?resource=reviews&is_approved=true&limit=50`);
      const data = await response.json();
      
      if (data.success && data.reviews && data.reviews.length > 0) {
        setReviews(data.reviews);
      } else {
        setReviews(fallbackReviews as any);
      }
    } catch (error) {
      console.log('Loading reviews from static data');
      setReviews(fallbackReviews as any);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <section id="reviews" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <Icon name="Loader2" size={48} className="animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

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
              
              <p className="text-gray-700 mb-4 leading-relaxed text-sm">"{review.comment}"</p>
              
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{review.author_name}</p>
                    <p className="text-xs text-gray-500">{formatDate(review.date)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-primary font-medium">{review.country}</p>
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