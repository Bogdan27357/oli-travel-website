import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const CHAT_API_URL = 'https://functions.poehali.dev/bcc8f618-4702-4e8b-9aac-7ac6a7b988e6';

interface Message {
  id: number;
  sender_type: 'user' | 'manager';
  sender_name: string;
  message: string;
  created_at: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isStarted || !sessionId) return;

    const interval = setInterval(async () => {
      try {
        const response = await fetch(`${CHAT_API_URL}?action=get_messages&session_id=${sessionId}`);
        const data = await response.json();
        
        if (data.success && data.messages) {
          setMessages(data.messages);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isStarted, sessionId]);

  const startChat = async () => {
    if (!userName.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Введите ваше имя',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create_session',
          user_name: userName
        })
      });

      const data = await response.json();

      if (data.success && data.session_id) {
        setSessionId(data.session_id);
        setIsStarted(true);
        toast({
          title: '✅ Чат начат!',
          description: 'Менеджер скоро ответит вам',
          className: 'bg-green-50 border-green-500'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось начать чат',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const tempMessage: Message = {
      id: Date.now(),
      sender_type: 'user',
      sender_name: userName,
      message: message.trim(),
      created_at: new Date().toISOString()
    };

    setMessages([...messages, tempMessage]);
    const messageToSend = message;
    setMessage('');

    try {
      await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send_message',
          session_id: sessionId,
          sender_type: 'user',
          sender_name: userName,
          message: messageToSend
        })
      });
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Сообщение не отправлено',
        variant: 'destructive'
      });
    }
  };

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl bg-gradient-to-r from-primary to-secondary hover:scale-110 transition-transform z-50 p-0"
          title="Открыть чат"
        >
          <Icon name="MessageCircle" size={28} className="text-white" />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col border-2 border-primary/20 animate-in slide-in-from-bottom-4">
          <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="Headphones" size={24} />
                <CardTitle className="text-lg">Онлайн-поддержка</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            {isStarted && (
              <p className="text-sm text-white/90 mt-1">
                <Icon name="Circle" size={8} className="inline text-green-300 animate-pulse" /> Онлайн
              </p>
            )}
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {!isStarted ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-primary/5 to-transparent">
                <Icon name="MessageSquare" size={64} className="text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2 text-center">Начните чат с менеджером</h3>
                <p className="text-gray-600 text-sm text-center mb-6">
                  Ответим на ваши вопросы и поможем подобрать тур
                </p>
                
                <div className="w-full space-y-3">
                  <Input
                    placeholder="Ваше имя"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && startChat()}
                    className="h-11"
                  />
                  <Button
                    onClick={startChat}
                    disabled={isLoading}
                    className="w-full h-11 bg-gradient-to-r from-primary to-secondary"
                  >
                    {isLoading ? (
                      <>
                        <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                        Подключение...
                      </>
                    ) : (
                      <>
                        <Icon name="MessageCircle" size={20} className="mr-2" />
                        Начать чат
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-8">
                      <Icon name="MessageSquare" size={48} className="mx-auto mb-2 text-gray-300" />
                      <p>Напишите первое сообщение</p>
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender_type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-2 shadow-sm ${
                            msg.sender_type === 'user'
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
                </div>

                <div className="p-4 bg-white border-t">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Введите сообщение..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
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
                      disabled={!message.trim()}
                      className="bg-gradient-to-r from-primary to-secondary px-4"
                    >
                      <Icon name="Send" size={20} />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    <Icon name="Clock" size={12} className="inline" /> Обычно отвечаем за 2-3 минуты
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
}
