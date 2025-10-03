import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import PasswordLogin from '@/components/admin/PasswordLogin';
import ManagerNameSetup from '@/components/admin/ManagerNameSetup';
import SessionsList, { Session } from '@/components/admin/SessionsList';
import ChatWindow, { Message } from '@/components/admin/ChatWindow';

const CHAT_API_URL = 'https://functions.poehali.dev/bcc8f618-4702-4e8b-9aac-7ac6a7b988e6';

export default function AdminChat() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [managerName, setManagerName] = useState(localStorage.getItem('manager_name') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem('manager_auth_token');
    return !!saved;
  });
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const previousMessageCountRef = useRef<Record<string, number>>({});

  const playNotificationSound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVqzn7q1aFApCmN/yvGYdBzWN0vLSfCwGKHnJ8NuOPwoUYLPp66lUFApFnuHyvGgcBzKJ0/PNfy0FKnrK8N6OPgwVYLPp66hTFAo/');
    }
    audioRef.current.play().catch(err => console.log('Sound play failed:', err));
  };

  const loadSessions = async () => {
    try {
      const response = await fetch(`${CHAT_API_URL}?action=get_all_sessions`);
      const data = await response.json();
      
      if (data.success && data.sessions) {
        data.sessions.forEach((session: Session) => {
          const prevCount = previousMessageCountRef.current[session.session_id] || 0;
          const newCount = session.message_count;
          
          if (prevCount > 0 && newCount > prevCount) {
            playNotificationSound();
            toast({
              title: '💬 Новое сообщение',
              description: `От ${session.user_name}`,
              duration: 3000,
            });
          }
          
          previousMessageCountRef.current[session.session_id] = newCount;
        });
        
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
        localStorage.setItem('manager_last_seen', Date.now().toString());
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

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  const handleNameSaved = (name: string) => {
    setManagerName(name);
  };

  const handleMessageSent = () => {
    if (selectedSession) {
      loadMessages(selectedSession);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('manager_name');
    localStorage.removeItem('manager_auth_token');
    setManagerName('');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <PasswordLogin onAuthenticated={handleAuthenticated} />;
  }

  if (!managerName || !localStorage.getItem('manager_name')) {
    return <ManagerNameSetup onNameSaved={handleNameSaved} />;
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
          <Button variant="outline" onClick={handleLogout}>
            <Icon name="LogOut" size={16} className="mr-2" />
            Выйти
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 h-[calc(100vh-180px)]">
          <SessionsList 
            sessions={sessions}
            selectedSession={selectedSession}
            onSelectSession={setSelectedSession}
          />
          
          <ChatWindow
            selectedSession={selectedSession}
            messages={messages}
            managerName={managerName}
            chatApiUrl={CHAT_API_URL}
            onMessageSent={handleMessageSent}
          />
        </div>
      </div>
    </div>
  );
}
