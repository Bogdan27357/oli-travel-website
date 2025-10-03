import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import PasswordLogin from '@/components/admin/PasswordLogin';
import ManagerNameSetup from '@/components/admin/ManagerNameSetup';
import SessionsList from '@/components/admin/SessionsList';
import ChatWindow from '@/components/admin/ChatWindow';
import ChatStatistics from '@/components/admin/ChatStatistics';
import TagManager from '@/components/admin/TagManager';
import ArchiveControl from '@/components/admin/ArchiveControl';
import QuickReplies from '@/components/admin/QuickReplies';
import { Session, Message } from '@/types/admin';

const CHAT_API_URL = 'https://functions.poehali.dev/bcc8f618-4702-4e8b-9aac-7ac6a7b988e6';

export default function AdminChat() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [managerName, setManagerName] = useState(localStorage.getItem('manager_name') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem('manager_auth_token');
    return !!saved;
  });
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [activeTab, setActiveTab] = useState('active');
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
        const storedData = localStorage.getItem('admin_sessions_data');
        const localData = storedData ? JSON.parse(storedData) : {};
        
        const enrichedSessions = data.sessions.map((session: Session) => ({
          ...session,
          tags: localData[session.session_id]?.tags || [],
          archived: localData[session.session_id]?.archived || false
        }));
        
        enrichedSessions.forEach((session: Session) => {
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
        
        setSessions(enrichedSessions);
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

  const handleTagsUpdate = (sessionId: string, tags: string[]) => {
    const storedData = localStorage.getItem('admin_sessions_data');
    const localData = storedData ? JSON.parse(storedData) : {};
    
    localData[sessionId] = {
      ...localData[sessionId],
      tags
    };
    
    localStorage.setItem('admin_sessions_data', JSON.stringify(localData));
    
    setSessions(sessions.map(s => 
      s.session_id === sessionId ? { ...s, tags } : s
    ));
  };

  const handleArchiveToggle = (sessionId: string, archived: boolean) => {
    const storedData = localStorage.getItem('admin_sessions_data');
    const localData = storedData ? JSON.parse(storedData) : {};
    
    localData[sessionId] = {
      ...localData[sessionId],
      archived
    };
    
    localStorage.setItem('admin_sessions_data', JSON.stringify(localData));
    
    setSessions(sessions.map(s => 
      s.session_id === sessionId ? { ...s, archived } : s
    ));
    
    if (archived && selectedSession === sessionId) {
      setSelectedSession(null);
    }
  };

  const handleQuickReplySelect = (message: string) => {
    setCurrentMessage(message);
    setShowQuickReplies(false);
  };

  const getCurrentSession = () => {
    return sessions.find(s => s.session_id === selectedSession);
  };

  if (!isAuthenticated) {
    return <PasswordLogin onAuthenticated={handleAuthenticated} />;
  }

  if (!managerName || !localStorage.getItem('manager_name')) {
    return <ManagerNameSetup onNameSaved={handleNameSaved} />;
  }

  const currentSession = getCurrentSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto p-4 max-w-[1600px]">
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

        <div className="mb-6">
          <ChatStatistics sessions={sessions} />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="active" className="gap-2">
              <Icon name="MessageSquare" size={16} />
              Активные
            </TabsTrigger>
            <TabsTrigger value="archived" className="gap-2">
              <Icon name="Archive" size={16} />
              Архив
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid lg:grid-cols-12 gap-4">
          <div className="lg:col-span-3">
            <TabsContent value="active" className="mt-0">
              <SessionsList 
                sessions={sessions}
                selectedSession={selectedSession}
                onSelectSession={setSelectedSession}
                showArchived={false}
              />
            </TabsContent>
            <TabsContent value="archived" className="mt-0">
              <SessionsList 
                sessions={sessions}
                selectedSession={selectedSession}
                onSelectSession={setSelectedSession}
                showArchived={true}
              />
            </TabsContent>
          </div>

          <div className="lg:col-span-6">
            <ChatWindow
              selectedSession={selectedSession}
              messages={messages}
              managerName={managerName}
              chatApiUrl={CHAT_API_URL}
              onMessageSent={handleMessageSent}
              onQuickReplyClick={() => setShowQuickReplies(!showQuickReplies)}
              currentMessage={currentMessage}
              onMessageChange={setCurrentMessage}
            />
          </div>

          <div className="lg:col-span-3 space-y-4">
            {showQuickReplies ? (
              <QuickReplies onSelectReply={handleQuickReplySelect} />
            ) : (
              <>
                <TagManager
                  sessionId={selectedSession}
                  sessionTags={currentSession?.tags || []}
                  onTagsUpdate={handleTagsUpdate}
                />
                
                <ArchiveControl
                  sessionId={selectedSession}
                  isArchived={currentSession?.archived || false}
                  onArchiveToggle={handleArchiveToggle}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}