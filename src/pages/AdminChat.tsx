import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const ADMIN_API_URL = 'REPLACE_WITH_ADMIN_CHAT_URL';
const CHAT_API_URL = 'https://functions.poehali.dev/bcc8f618-4702-4e8b-9aac-7ac6a7b988e6';

interface Message {
  id: number;
  sender_type: 'user' | 'manager';
  sender_name: string;
  message: string;
  created_at: string;
}

interface Session {
  session_id: string;
  user_name: string;
  created_at: string;
  status: string;
  message_count: number;
  last_message_at: string | null;
}

export default function AdminChat() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [managerName, setManagerName] = useState(localStorage.getItem('manager_name') || '');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadSessions = async () => {
    try {
      const response = await fetch(`${CHAT_API_URL}?action=get_all_sessions`);
      const data = await response.json();
      
      if (data.success && data.sessions) {
        setSessions(data.sessions);
      }
    } catch (error) {
      console.error('Error loading sessions:', error);
    }
  };

  const loadMessages = async (sessionId: string) => {
    try {
      const response = await fetch(`${CHAT_API_URL}?action=get_messages&session_id=${sessionId}`);
      const data = await response.json();
      
      if (data.success && data.messages) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  useEffect(() => {
    if (!managerName) return;
    
    loadSessions();
    const interval = setInterval(loadSessions, 5000);
    return () => clearInterval(interval);
  }, [managerName]);

  useEffect(() => {
    if (!selectedSession) return;
    
    loadMessages(selectedSession);
    const interval = setInterval(() => loadMessages(selectedSession), 3000);
    return () => clearInterval(interval);
  }, [selectedSession]);

  const sendMessage = async () => {
    if (!message.trim() || !selectedSession || !managerName) return;

    setIsLoading(true);
    
    try {
      await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send_message',
          session_id: selectedSession,
          sender_type: 'manager',
          sender_name: managerName,
          message: message.trim()
        })
      });

      setMessage('');
      await loadMessages(selectedSession);
      
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

  const saveManagerName = () => {
    if (managerName.trim()) {
      localStorage.setItem('manager_name', managerName.trim());
      toast({
        title: '✅ Имя сохранено',
        description: 'Вы можете начать отвечать клиентам'
      });
    }
  };

  if (!managerName || !localStorage.getItem('manager_name')) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl flex items-center justify-center gap-2">
              <Icon name="UserCog" size={28} className="text-primary" />
              Панель менеджера
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-gray-600">
              Введите ваше имя для начала работы с чатами
            </p>
            <Input
              placeholder="Ваше имя (например: Ольга, Вячеслав)"
              value={managerName}
              onChange={(e) => setManagerName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && saveManagerName()}
              className="h-12"
            />
            <Button
              onClick={saveManagerName}
              className="w-full h-12 bg-gradient-to-r from-primary to-secondary"
              disabled={!managerName.trim()}
            >
              <Icon name="LogIn" size={20} className="mr-2" />
              Войти в панель
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto p-4 max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Панель менеджера
            </h1>
            <p className="text-gray-600 mt-1">
              <Icon name="User" size={16} className="inline" /> {managerName}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              localStorage.removeItem('manager_name');
              setManagerName('');
            }}
          >
            <Icon name="LogOut" size={16} className="mr-2" />
            Выйти
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 h-[calc(100vh-180px)]">
          <Card className="lg:col-span-1 flex flex-col">
            <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white">
              <CardTitle className="text-lg flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Icon name="Users" size={20} />
                  Активные чаты
                </span>
                <Badge className="bg-white text-primary">
                  {sessions.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-0">
              {sessions.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 p-6">
                  <Icon name="MessageSquare" size={48} className="mb-2" />
                  <p>Нет активных чатов</p>
                </div>
              ) : (
                <div className="divide-y">
                  {sessions.map((session) => (
                    <div
                      key={session.session_id}
                      onClick={() => setSelectedSession(session.session_id)}
                      className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                        selectedSession === session.session_id ? 'bg-primary/5 border-l-4 border-primary' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icon name="User" size={16} className="text-primary" />
                          <span className="font-bold">{session.user_name}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {session.message_count}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">
                        {session.last_message_at 
                          ? new Date(session.last_message_at).toLocaleString('ru')
                          : 'Нет сообщений'}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 flex flex-col">
            {!selectedSession ? (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <Icon name="MessageCircle" size={64} className="mx-auto mb-4" />
                  <p className="text-xl">Выберите чат для ответа</p>
                </div>
              </div>
            ) : (
              <>
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

                <div className="p-4 bg-white border-t">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Введите сообщение клиенту..."
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
                      disabled={!message.trim() || isLoading}
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
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
