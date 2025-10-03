import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const BACKEND_URL = 'https://functions.poehali.dev/dea48100-ddb2-4f0d-8e5f-770296090960';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      toast({
        title: "Ошибка",
        description: "Введите корректный email",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'newsletter',
          email: email,
          name: 'Подписчик',
          message: 'Подписка на рассылку горящих туров'
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: "✅ Вы подписаны!",
          description: "Будем присылать лучшие предложения на вашу почту",
          className: "bg-green-50 border-green-500"
        });
        setEmail('');
      } else {
        throw new Error(data.error || 'Ошибка подписки');
      }
    } catch (error: any) {
      toast({
        title: "Ошибка подписки",
        description: error.message || "Попробуйте позже",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 relative overflow-hidden">
      {/* Анимированный фон */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Заголовок с колокольчиком */}
          <div className="text-center text-white mb-8">
            <div className="inline-flex items-center gap-3 mb-4 animate-bounce">
              <Icon name="Bell" size={56} className="drop-shadow-lg" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              🔔 Подпишитесь на рассылку горящих туров
            </h2>
            <p className="text-xl md:text-2xl font-medium opacity-95">
              Получайте эксклюзивные предложения и скидки до 50% на email
            </p>
          </div>

          {/* Форма подписки */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-8">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Введите ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 bg-white text-gray-900 text-lg px-6 border-2 border-white shadow-2xl focus:ring-4 focus:ring-white/30"
                disabled={isSubmitting}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-14 px-10 bg-white text-red-600 hover:bg-gray-50 font-bold text-lg shadow-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-white"
            >
              {isSubmitting ? (
                <>
                  <Icon name="Loader2" size={24} className="mr-2 animate-spin" />
                  Подписываем...
                </>
              ) : (
                'Подписаться'
              )}
            </Button>
          </form>

          {/* Преимущества подписки */}
          <div className="grid md:grid-cols-3 gap-4 text-white text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <Icon name="Zap" size={32} className="mx-auto mb-2" />
              <p className="font-semibold">Первыми узнавайте</p>
              <p className="text-sm opacity-90">о горящих турах</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <Icon name="Percent" size={32} className="mx-auto mb-2" />
              <p className="font-semibold">Скидки до 50%</p>
              <p className="text-sm opacity-90">только для подписчиков</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <Icon name="Shield" size={32} className="mx-auto mb-2" />
              <p className="font-semibold">Никакого спама</p>
              <p className="text-sm opacity-90">отписаться в 1 клик</p>
            </div>
          </div>

          <p className="text-center text-white/80 text-sm mt-6">
            🔒 Ваши данные защищены. Мы не передаем их третьим лицам.
          </p>
        </div>
      </div>
    </section>
  );
}