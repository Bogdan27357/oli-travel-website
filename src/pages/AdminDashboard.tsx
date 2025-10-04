import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { adminAPI } from '@/lib/admin-api';
import { useToast } from '@/hooks/use-toast';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    submissions: 0,
    tours: 0,
    reviews: 0,
    pendingReviews: 0
  });
  const [loading, setLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState(localStorage.getItem('hero_video_url') || '');
  const [heroPosition, setHeroPosition] = useState(localStorage.getItem('hero_position') || 'center');
  const [heroTitle, setHeroTitle] = useState(localStorage.getItem('hero_title') || 'Откройте мир вместе с нами');
  const [heroSubtitle, setHeroSubtitle] = useState(localStorage.getItem('hero_subtitle') || 'Туры из Санкт-Петербурга по лучшим ценам');
  const { toast } = useToast();
  
  const chartData = [
    { day: 'Пн', заявки: 2 },
    { day: 'Вт', заявки: 5 },
    { day: 'Ср', заявки: 3 },
    { day: 'Чт', заявки: 8 },
    { day: 'Пт', заявки: 6 },
    { day: 'Сб', заявки: 4 },
    { day: 'Вс', заявки: 1 }
  ];

  useEffect(() => {
    const defaultVideoUrl = 'https://youtube.com/shorts/KIB0PwVua0w';
    if (!localStorage.getItem('hero_video_url')) {
      localStorage.setItem('hero_video_url', defaultVideoUrl);
      setVideoUrl(defaultVideoUrl);
    }
  }, []);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await adminAPI.stats.get();
        
        if (data.success && data.stats) {
          setStats({
            submissions: data.stats.contacts?.total || 0,
            tours: data.stats.tours?.total || 0,
            reviews: data.stats.reviews?.total || 0,
            pendingReviews: data.stats.reviews?.pending || 0
          });
        }
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const statCards = [
    { 
      title: 'Всего заявок', 
      value: stats.submissions, 
      icon: 'Mail', 
      color: 'from-blue-500 to-blue-600' 
    },
    { 
      title: 'Туры', 
      value: stats.tours, 
      icon: 'Plane', 
      color: 'from-green-500 to-green-600' 
    },
    { 
      title: 'Отзывы', 
      value: stats.reviews, 
      icon: 'MessageSquare', 
      color: 'from-purple-500 to-purple-600' 
    },
    { 
      title: 'На модерации', 
      value: stats.pendingReviews, 
      icon: 'Clock', 
      color: 'from-orange-500 to-orange-600' 
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Icon name="Loader2" size={48} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 md:p-0">
      <div>
        <h1 className="text-2xl font-bold mb-1">Панель управления</h1>
        <p className="text-sm text-gray-600">Обзор системы</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {statCards.map((stat) => (
          <Card key={stat.title} className="overflow-hidden">
            <CardHeader className={`bg-gradient-to-r ${stat.color} text-white pb-2 pt-3`}>
              <Icon name={stat.icon as any} size={20} />
            </CardHeader>
            <CardContent className="pt-3">
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs text-gray-600">{stat.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Icon name="TrendingUp" size={20} className="text-primary" />
            Активность за неделю
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="заявки" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Icon name="Activity" size={20} className="text-primary" />
              Быстрые действия
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a href="/admin/tours" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-2">
                <Icon name="Plus" size={16} className="text-primary" />
                <div>
                  <div className="text-sm font-semibold">Добавить тур</div>
                  <div className="text-xs text-gray-600">Новое предложение</div>
                </div>
              </div>
            </a>
            
            <a href="/admin/submissions" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-2">
                <Icon name="Mail" size={16} className="text-primary" />
                <div>
                  <div className="text-sm font-semibold">Заявки</div>
                  <div className="text-xs text-gray-600">Обработать запросы</div>
                </div>
              </div>
            </a>

            <a href="/admin/reviews" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle" size={16} className="text-primary" />
                <div>
                  <div className="text-sm font-semibold">Модерация</div>
                  <div className="text-xs text-gray-600">
                    {stats.pendingReviews > 0 ? `${stats.pendingReviews} отзывов` : 'Все проверены'}
                  </div>
                </div>
              </div>
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Icon name="Video" size={20} className="text-primary" />
              Видео на главной
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Input
                type="url"
                placeholder="youtube.com/shorts/..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="text-sm"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  localStorage.setItem('hero_video_url', videoUrl);
                  toast({ title: '✅ Сохранено' });
                }}
                className="flex-1 text-sm h-9"
              >
                <Icon name="Save" size={14} className="mr-1" />
                Сохранить
              </Button>
              {videoUrl && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setVideoUrl('');
                    localStorage.removeItem('hero_video_url');
                    toast({ title: '🗑️ Удалено' });
                  }}
                  className="text-sm h-9"
                >
                  <Icon name="Trash2" size={14} />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Icon name="Type" size={20} className="text-primary" />
              Текст главной
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              type="text"
              placeholder="Главный лозунг"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              className="text-sm"
            />
            <Input
              type="text"
              placeholder="Подзаголовок"
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              className="text-sm"
            />
            <Button
              onClick={() => {
                localStorage.setItem('hero_title', heroTitle);
                localStorage.setItem('hero_subtitle', heroSubtitle);
                localStorage.setItem('hero_position', heroPosition);
                toast({ title: '✅ Сохранено' });
              }}
              className="w-full text-sm h-9"
            >
              <Icon name="Save" size={14} className="mr-1" />
              Сохранить
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}