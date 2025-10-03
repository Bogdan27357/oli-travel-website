import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Session } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';

interface ChatStatisticsProps {
  sessions: Session[];
}

export default function ChatStatistics({ sessions }: ChatStatisticsProps) {
  const { toast } = useToast();
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

  const exportToCSV = () => {
    const csvData = [
      ['ID сессии', 'Имя пользователя', 'Создан', 'Статус', 'Сообщений', 'Последнее сообщение', 'Теги', 'Архивирован'],
      ...sessions.map(s => [
        s.session_id,
        s.user_name,
        new Date(s.created_at).toLocaleString('ru'),
        s.status,
        s.message_count,
        s.last_message_at ? new Date(s.last_message_at).toLocaleString('ru') : 'Нет сообщений',
        (s.tags || []).join(', '),
        s.archived ? 'Да' : 'Нет'
      ])
    ];
    
    const csv = csvData.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `статистика_чатов_${new Date().toLocaleDateString('ru')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: '📊 Экспорт выполнен',
      description: 'Статистика сохранена в CSV файл',
      duration: 3000
    });
  };

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
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Icon name="BarChart3" size={20} />
            Статистика обращений
          </CardTitle>
          <Button
            onClick={exportToCSV}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Icon name="Download" size={16} />
            Экспорт CSV
          </Button>
        </div>
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