import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export interface Session {
  session_id: string;
  user_name: string;
  created_at: string;
  status: string;
  message_count: number;
  last_message_at: string | null;
}

interface SessionsListProps {
  sessions: Session[];
  selectedSession: string | null;
  onSelectSession: (sessionId: string) => void;
}

export default function SessionsList({ sessions, selectedSession, onSelectSession }: SessionsListProps) {
  return (
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
                onClick={() => onSelectSession(session.session_id)}
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
  );
}
