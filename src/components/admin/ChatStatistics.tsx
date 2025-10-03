import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Session } from '@/types/admin';

interface ChatStatisticsProps {
  sessions: Session[];
}

export default function ChatStatistics({ sessions }: ChatStatisticsProps) {
  const activeSessions = sessions.filter(s => !s.archived).length;
  const archivedSessions = sessions.filter(s => s.archived).length;
  const totalMessages = sessions.reduce((sum, s) => sum + s.message_count, 0);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);
  
  const sessionsToday = sessions.filter(s => {
    const created = new Date(s.created_at);
    return created >= today;
  }).length;
  
  const sessionsWeek = sessions.filter(s => {
    const created = new Date(s.created_at);
    return created >= weekAgo;
  }).length;

  const stats = [
    {
      icon: 'MessageSquare',
      label: 'Всего чатов',
      value: sessions.length,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: 'CheckCircle',
      label: 'Активные',
      value: activeSessions,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: 'Archive',
      label: 'В архиве',
      value: archivedSessions,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    },
    {
      icon: 'MessageCircle',
      label: 'Сообщений',
      value: totalMessages,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: 'Clock',
      label: 'Сегодня',
      value: sessionsToday,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      icon: 'TrendingUp',
      label: 'За неделю',
      value: sessionsWeek,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="BarChart3" size={20} />
          Статистика обращений
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`${stat.bgColor} rounded-lg p-4 transition-all hover:shadow-md`}
            >
              <div className="flex items-center gap-3">
                <div className={`${stat.color} p-2 rounded-lg bg-white`}>
                  <Icon name={stat.icon as any} size={20} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
