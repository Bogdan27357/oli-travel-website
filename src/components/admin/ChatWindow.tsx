import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { Message } from '@/types/admin';

interface ChatWindowProps {
  selectedSession: string | null;
  messages: Message[];
  managerName: string;
  chatApiUrl: string;
  onMessageSent: () => void;
  onQuickReplyClick: () => void;
  currentMessage: string;
  onMessageChange: (message: string) => void;
}

export default function ChatWindow({ 
  selectedSession, 
  messages, 
  managerName, 
  chatApiUrl,
  onMessageSent,
  onQuickReplyClick,
  currentMessage,
  onMessageChange
}: ChatWindowProps) {
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!currentMessage.trim() || !selectedSession || !managerName) return;

    setIsLoading(true);
    
    try {
      await fetch(chatApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send_message',
          session_id: selectedSession,
          sender_type: 'manager',
          sender_name: managerName,
          message: currentMessage.trim()
        })
      });

      onMessageChange('');
      onMessageSent();
      
      toast({
        title: '✅ Отправлено',
        description: 'Сообщение доставлено клиенту',
        className: 'bg-green-50 border-green-500'
      });
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить сообщение',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedSession) {
    return (
      <Card className="lg:col-span-2 flex flex-col">
        <div className="flex-1 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <Icon name="MessageCircle" size={64} className="mx-auto mb-4" />
            <p className="text-xl">Выберите чат для ответа</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="lg:col-span-2 flex flex-col">
      <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white">
        <CardTitle className="text-lg flex items-center gap-2">
          <Icon name="MessageSquare" size={20} />
          Чат с клиентом
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 mt-8">
            <Icon name="MessageCircle" size={48} className="mx-auto mb-2" />
            <p>Пока нет сообщений</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender_type === 'manager' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 shadow-sm ${
                  msg.sender_type === 'manager'
                    ? 'bg-gradient-to-r from-primary to-secondary text-white rounded-br-none'
                    : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                }`}
              >
                <p className="text-sm font-medium mb-1 opacity-75">
                  {msg.sender_name}
                </p>
                <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                <p className="text-xs mt-1 opacity-60">
                  {new Date(msg.created_at).toLocaleTimeString('ru', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </CardContent>

      <div className="p-4 bg-white border-t space-y-2">
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={onQuickReplyClick}
            className="gap-2"
          >
            <Icon name="MessageSquareText" size={16} />
            Шаблоны
          </Button>
        </div>
        <div className="flex gap-2">
          <Textarea
            placeholder="Введите сообщение клиенту..."
            value={currentMessage}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            className="resize-none min-h-[44px] max-h-[100px]"
            rows={1}
          />
          <Button
            onClick={sendMessage}
            disabled={!currentMessage.trim() || isLoading}
            className="bg-gradient-to-r from-primary to-secondary px-4"
          >
            {isLoading ? (
              <Icon name="Loader2" size={20} className="animate-spin" />
            ) : (
              <Icon name="Send" size={20} />
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}