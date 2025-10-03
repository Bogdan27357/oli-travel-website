import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { Tour } from '@/data/tours';
import { useToast } from '@/hooks/use-toast';

interface TourDetailModalProps {
  tour: Tour | null;
  open: boolean;
  onClose: () => void;
}

const TourDetailModal = ({ tour, open, onClose }: TourDetailModalProps) => {
  const { toast } = useToast();

  if (!tour) return null;

  const handleBook = () => {
    toast({
      title: "Заявка принята! 🎉",
      description: `Менеджер свяжется с вами для бронирования тура "${tour.title}"`,
    });
    onClose();
  };

  const getCategoryName = (category: string) => {
    switch(category) {
      case 'beach': return 'Пляжный отдых';
      case 'exotic': return 'Экзотика';
      case 'excursion': return 'Экскурсионный';
      case 'ski': return 'Горнолыжный';
      default: return 'Туризм';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{tour.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative">
            <img
              src={tour.image}
              alt={tour.title}
              className="w-full h-80 object-cover rounded-lg"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <Badge className="bg-primary/90 backdrop-blur text-lg px-4 py-2">
                {tour.price.toLocaleString('ru-RU')} ₽
              </Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Icon name="Info" size={20} className="text-primary" />
                  Основная информация
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600">Страна:</span>
                    <span className="font-semibold">{tour.country}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600">Город:</span>
                    <span className="font-semibold">{tour.city}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600">Отель:</span>
                    <span className="font-semibold">{tour.hotel}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600">Звезды:</span>
                    <div className="flex items-center gap-1 text-yellow-500">
                      {Array.from({ length: tour.stars }).map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="fill-current" />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600">Категория:</span>
                    <span className="font-semibold">{getCategoryName(tour.category)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Icon name="Calendar" size={20} className="text-primary" />
                  Даты и перелет
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600">Продолжительность:</span>
                    <span className="font-semibold">{tour.duration}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600">Даты вылета:</span>
                    <span className="font-semibold">{tour.dates}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600">Тип перелета:</span>
                    <Badge variant={tour.fromSpb === 'direct' ? 'default' : 'secondary'}>
                      {tour.fromSpb === 'direct' ? '✈️ Прямой рейс' : '🔄 С пересадкой'}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Icon name="Check" size={20} className="text-primary" />
                  Что включено
                </h3>
                <div className="space-y-2">
                  {tour.includes.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded">
                      <Icon name="CheckCircle2" size={16} className="text-green-600" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {tour.description && (
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Icon name="FileText" size={20} className="text-primary" />
                    Описание
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {tour.description}
                  </p>
                </div>
              )}

              {tour.whyChoose && tour.whyChoose.length > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Icon name="Sparkles" size={18} className="text-blue-600" />
                    Почему выбрать этот тур?
                  </h4>
                  <div className="space-y-2">
                    {tour.whyChoose.map((reason, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Icon name="Star" size={14} className="text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {tour.program && tour.program.length > 0 && (
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-lg">
              <h3 className="font-semibold text-xl mb-4 flex items-center gap-2">
                <Icon name="ScrollText" size={24} className="text-primary" />
                📋 Описание программы
              </h3>
              <div className="space-y-3">
                {tour.program.map((day, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed pt-1">{day}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator />

          <div className="bg-gradient-to-r from-primary to-blue-600 text-white p-6 rounded-lg">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="text-sm opacity-90 mb-1">Стоимость тура на двоих</div>
                <div className="text-4xl font-bold">{tour.price.toLocaleString('ru-RU')} ₽</div>
                <div className="text-sm opacity-90 mt-1">≈ {Math.round(tour.price / tour.duration.split(' ')[0])} ₽ за ночь</div>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100 px-8"
                  onClick={handleBook}
                >
                  <Icon name="Phone" size={18} className="mr-2" />
                  Забронировать тур
                </Button>
                {tour.program && tour.program.length > 0 && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-transparent text-white border-white hover:bg-white/20"
                    onClick={() => {
                      const programText = `
${tour.title}
${tour.hotel} ${tour.stars}⭐
${tour.duration} | ${tour.dates}

ПРОГРАММА ТУРА:
${tour.program.map((day, i) => `${i + 1}. ${day}`).join('\n')}

${tour.whyChoose ? `\nПОЧЕМУ ВЫБРАТЬ ЭТОТ ТУР:\n${tour.whyChoose.map(r => `• ${r}`).join('\n')}` : ''}

Стоимость: ${tour.price.toLocaleString('ru-RU')} ₽

Контакты: +7 (981) 981-29-90
Сайт: oli-travel.com
                      `.trim();
                      
                      const blob = new Blob([programText], { type: 'text/plain;charset=utf-8' });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = `${tour.title.replace(/[^\w\s]/gi, '')}_программа.txt`;
                      link.click();
                      URL.revokeObjectURL(url);
                      
                      toast({
                        title: "✅ Программа скачана",
                        description: "Файл сохранен в папку загрузок"
                      });
                    }}
                  >
                    <Icon name="Download" size={16} className="mr-2" />
                    Скачать программу
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Icon name="Utensils" size={24} className="mx-auto mb-2 text-primary" />
              <div className="text-sm font-semibold">Питание</div>
              <div className="text-xs text-gray-600">По программе</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Icon name="Shield" size={24} className="mx-auto mb-2 text-primary" />
              <div className="text-sm font-semibold">Страховка</div>
              <div className="text-xs text-gray-600">Включена</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Icon name="Users" size={24} className="mx-auto mb-2 text-primary" />
              <div className="text-sm font-semibold">Трансфер</div>
              <div className="text-xs text-gray-600">Аэропорт-отель</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Icon name="Headphones" size={24} className="mx-auto mb-2 text-primary" />
              <div className="text-sm font-semibold">Поддержка 24/7</div>
              <div className="text-xs text-gray-600">На связи</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TourDetailModal;