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
    <section className="py-16 bg-gradient-to-r from-primary to-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          <div className="mb-6">
            <Icon name="Mail" size={48} className="mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Подпишитесь на горящие туры
            </h2>
            <p className="text-lg opacity-90">
              Получайте лучшие предложения и скидки до 50% первыми
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-white text-gray-900 flex-1"
              disabled={isSubmitting}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 px-8 bg-white text-primary hover:bg-gray-100 font-semibold"
            >
              {isSubmitting ? (
                <>
                  <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                  Подписываем...
                </>
              ) : (
                <>
                  <Icon name="Send" size={20} className="mr-2" />
                  Подписаться
                </>
              )}
            </Button>
          </form>

          <p className="text-sm opacity-75 mt-4">
            Никакого спама. Только выгодные предложения. Отписаться можно в любой момент.
          </p>
        </div>
      </div>
    </section>
  );
}
