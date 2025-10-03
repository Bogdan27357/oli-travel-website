import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Session } from '@/types/admin';

interface SessionsListProps {
  sessions: Session[];
  selectedSession: string | null;
  onSelectSession: (sessionId: string) => void;
  showArchived?: boolean;
}

export default function SessionsList({ sessions, selectedSession, onSelectSession, showArchived = false }: SessionsListProps) {
  const filteredSessions = sessions.filter(s => showArchived ? s.archived : !s.archived);
  
  return (
    <Card className="lg:col-span-1 flex flex-col">
      <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white">
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Icon name={showArchived ? "Archive" : "Users"} size={20} />
            {showArchived ? 'Архив' : 'Активные чаты'}
          </span>
          <Badge className="bg-white text-primary">
            {filteredSessions.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-0">
        {filteredSessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 p-6">
            <Icon name={showArchived ? "Archive" : "MessageSquare"} size={48} className="mb-2" />
            <p>{showArchived ? 'Архив пуст' : 'Нет активных чатов'}</p>
          </div>
        ) : (
          <div className="divide-y">
            {filteredSessions.map((session) => (
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
                {session.tags && session.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {session.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
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