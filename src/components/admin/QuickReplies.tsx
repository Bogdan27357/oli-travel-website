import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { QuickReply } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';

interface QuickRepliesProps {
  onSelectReply: (message: string) => void;
}

const DEFAULT_REPLIES: QuickReply[] = [
  {
    id: '1',
    title: 'Приветствие',
    message: 'Здравствуйте! Чем могу помочь?',
    category: 'Общее'
  },
  {
    id: '2',
    title: 'Уточнение',
    message: 'Пожалуйста, уточните ваш вопрос подробнее',
    category: 'Общее'
  },
  {
    id: '3',
    title: 'Время работы',
    message: 'Наш график работы: ПН-ПТ с 9:00 до 18:00',
    category: 'Информация'
  },
  {
    id: '4',
    title: 'Принято',
    message: 'Принято! Скоро свяжемся с вами',
    category: 'Заказ'
  },
  {
    id: '5',
    title: 'Благодарность',
    message: 'Спасибо за обращение! Всегда рады помочь 😊',
    category: 'Общее'
  },
  {
    id: '6',
    title: 'Ожидание',
    message: 'Минуточку, проверяю информацию...',
    category: 'Общее'
  }
];

export default function QuickReplies({ onSelectReply }: QuickRepliesProps) {
  const [replies, setReplies] = useState<QuickReply[]>(DEFAULT_REPLIES);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();

  const handleSelectReply = (reply: QuickReply) => {
    onSelectReply(reply.message);
    toast({
      title: '✅ Шаблон вставлен',
      description: reply.title,
      duration: 2000
    });
  };

  const handleCreateReply = () => {
    if (!newTitle.trim() || !newMessage.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Заполните название и текст шаблона',
        variant: 'destructive'
      });
      return;
    }

    const newReply: QuickReply = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      message: newMessage.trim(),
      category: 'Свои'
    };

    setReplies([...replies, newReply]);
    setNewTitle('');
    setNewMessage('');
    setIsCreating(false);

    toast({
      title: '✅ Шаблон создан',
      description: newReply.title,
      duration: 2000
    });
  };

  const handleDeleteReply = (id: string) => {
    setReplies(replies.filter(r => r.id !== id));
    toast({
      title: '🗑️ Шаблон удалён',
      duration: 2000
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icon name="MessageSquareText" size={18} />
          Быстрые ответы
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
          {replies.map((reply) => (
            <div
              key={reply.id}
              className="group p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
            >
              <div className="flex items-start justify-between gap-2">
                <button
                  onClick={() => handleSelectReply(reply)}
                  className="flex-1 text-left"
                >
                  <p className="font-medium text-sm mb-1 flex items-center gap-2">
                    {reply.title}
                    <span className="text-xs text-gray-500 font-normal">
                      {reply.category}
                    </span>
                  </p>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {reply.message}
                  </p>
                </button>
                {reply.category === 'Свои' && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteReply(reply.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                  >
                    <Icon name="Trash2" size={14} className="text-red-500" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {isCreating ? (
          <div className="space-y-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <Input
              placeholder="Название шаблона"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="h-9"
            />
            <Textarea
              placeholder="Текст сообщения"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              rows={3}
              className="resize-none"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleCreateReply}
                className="flex-1 bg-gradient-to-r from-primary to-secondary"
              >
                <Icon name="Check" size={16} className="mr-1" />
                Сохранить
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setIsCreating(false);
                  setNewTitle('');
                  setNewMessage('');
                }}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => setIsCreating(true)}
            variant="outline"
            className="w-full"
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Создать свой шаблон
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
