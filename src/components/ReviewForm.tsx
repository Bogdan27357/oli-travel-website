import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const ADMIN_API_URL = 'https://functions.poehali.dev/2ebb973a-0dd8-4f3b-8168-e788b062dbef';

export default function ReviewForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    author_name: '',
    country: '',
    comment: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.author_name || !formData.comment) {
      toast({
        title: 'Ошибка',
        description: 'Заполните обязательные поля',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${ADMIN_API_URL}?resource=reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          author_name: formData.author_name,
          author_avatar: null,
          country: formData.country || 'Россия',
          rating: rating,
          comment: formData.comment,
          date: new Date().toISOString().split('T')[0],
          is_approved: false
        })
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: '✅ Спасибо за отзыв!',
          description: 'Ваш отзыв отправлен на модерацию и скоро появится на сайте',
          className: 'bg-green-50 border-green-500'
        });
        
        setFormData({ author_name: '', country: '', comment: '' });
        setRating(5);
        setOpen(false);
      } else {
        throw new Error(data.error || 'Ошибка при отправке');
      }
    } catch (error: any) {
      toast({
        title: 'Ошибка',
        description: error.message || 'Не удалось отправить отзыв',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
          <Icon name="MessageSquarePlus" size={20} />
          Оставить отзыв
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Оставить отзыв</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Ваше имя *</label>
            <Input
              placeholder="Иван Иванов"
              value={formData.author_name}
              onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Страна отдыха</label>
            <Input
              placeholder="Например: Турция, Египет..."
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Оценка *</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-125"
                >
                  <Icon
                    name="Star"
                    size={32}
                    className={`${
                      star <= (hoveredRating || rating)
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-300'
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Ваш отзыв *</label>
            <Textarea
              placeholder="Расскажите о своём путешествии..."
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              rows={5}
              required
            />
          </div>

          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-primary to-secondary"
            >
              {loading ? (
                <>
                  <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                  Отправка...
                </>
              ) : (
                <>
                  <Icon name="Send" size={16} className="mr-2" />
                  Отправить
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Отмена
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            * Обязательные поля. Отзыв будет опубликован после проверки модератором.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
