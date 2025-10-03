import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const BACKEND_URL = 'https://functions.poehali.dev/dea48100-ddb2-4f0d-8e5f-770296090960';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
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
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: "✅ Заявка отправлена!",
          description: data.message || "Мы свяжемся с вами в ближайшее время",
          className: "bg-green-50 border-green-500"
        });
        
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error(data.error || 'Ошибка отправки');
      }
    } catch (error: any) {
      toast({
        title: "Ошибка отправки",
        description: error.message || "Попробуйте позже или позвоните нам",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacts" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Свяжитесь с нами
              </span>
            </h2>
            <p className="text-gray-600 text-lg">
              Оставьте заявку и мы поможем подобрать идеальный тур
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="MessageSquare" size={28} className="text-primary" />
                  Форма обратной связи
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Ваше имя <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Иван Иванов"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="h-11"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="email"
                      placeholder="ivan@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="h-11"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Телефон
                    </label>
                    <Input
                      type="tel"
                      placeholder="+7 (900) 123-45-67"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="h-11"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Сообщение <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      placeholder="Расскажите, куда хотите поехать и когда..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 text-lg bg-gradient-to-r from-primary to-secondary hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    {isSubmitting ? (
                      <>
                        <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                        Отправляем...
                      </>
                    ) : (
                      <>
                        <Icon name="Send" size={20} className="mr-2" />
                        Отправить заявку
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="shadow-xl border-0 p-6 hover:shadow-2xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-full">
                    <Icon name="Phone" size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Телефон Ольга</h3>
                    <a href="tel:+79819812990" className="text-gray-600 hover:text-primary transition-colors">+7 981 981-29-90</a>
                    <p className="text-sm text-gray-500 mt-1">Ежедневно с 9:00 до 21:00</p>
                  </div>
                </div>
              </Card>

              <Card className="shadow-xl border-0 p-6 hover:shadow-2xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-full">
                    <Icon name="Phone" size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Телефон Вячеслав</h3>
                    <a href="tel:+79219456735" className="text-gray-600 hover:text-primary transition-colors">+7 921 945-67-35</a>
                    <p className="text-sm text-gray-500 mt-1">Ежедневно с 9:00 до 21:00</p>
                  </div>
                </div>
              </Card>

              <Card className="shadow-xl border-0 p-6 hover:shadow-2xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-full">
                    <Icon name="MessageCircle" size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">WhatsApp</h3>
                    <a href="https://wa.me/79819812990" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-600 transition-colors">+7 981 981-29-90</a>
                    <p className="text-sm text-gray-500 mt-1">Быстрый ответ в мессенджере</p>
                  </div>
                </div>
              </Card>

              <Card className="shadow-xl border-0 p-6 hover:shadow-2xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-full">
                    <Icon name="Send" size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Telegram</h3>
                    <a href="https://t.me/Oli_Travel" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">@Oli_Travel</a>
                    <p className="text-sm text-gray-500 mt-1">Пишите в любое время</p>
                  </div>
                </div>
              </Card>

              <Card className="shadow-xl border-0 p-6 bg-gradient-to-br from-primary/10 to-secondary/10">
                <div className="text-center">
                  <Icon name="Clock" size={48} className="mx-auto mb-3 text-primary" />
                  <h3 className="font-bold text-xl mb-2">Быстрый ответ</h3>
                  <p className="text-gray-600">
                    Отвечаем на все заявки в течение 15 минут в рабочее время
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}