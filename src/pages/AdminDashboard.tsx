import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { adminAPI } from '@/lib/admin-api';
import { useToast } from '@/hooks/use-toast';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    submissions: 0,
    tours: 0,
    reviews: 0,
    pendingReviews: 0
  });
  const [loading, setLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState(localStorage.getItem('hero_video_url') || '');
  const [musicUrl, setMusicUrl] = useState(localStorage.getItem('hero_music_url') || '');
  const [heroPosition, setHeroPosition] = useState(localStorage.getItem('hero_position') || 'center');
  const [heroTitle, setHeroTitle] = useState(localStorage.getItem('hero_title') || 'Откройте мир вместе с нами');
  const [heroSubtitle, setHeroSubtitle] = useState(localStorage.getItem('hero_subtitle') || 'Туры из Санкт-Петербурга по лучшим ценам');
  const { toast } = useToast();

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
        const [submissionsData, toursData, reviewsData] = await Promise.all([
          adminAPI.submissions.list('all', 1, 0),
          adminAPI.tours.list(1, 0),
          adminAPI.reviews.list('all', 1, 0)
        ]);

        setStats({
          submissions: submissionsData.total || 0,
          tours: toursData.total || 0,
          reviews: reviewsData.total || 0,
          pendingReviews: reviewsData.pending || 0
        });
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
    <div className="space-y-4 md:space-y-6 p-4 md:p-0">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Панель управления</h1>
        <p className="text-sm md:text-base text-gray-600">Обзор системы управления сайтом</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title} className="overflow-hidden">
            <CardHeader className={`bg-gradient-to-r ${stat.color} text-white pb-2`}>
              <Icon name={stat.icon as any} size={24} className="md:w-8 md:h-8" />
            </CardHeader>
            <CardContent className="pt-3 md:pt-4">
              <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs md:text-sm text-gray-600">{stat.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Activity" size={24} className="text-primary" />
              Быстрые действия
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 md:space-y-3">
            <a href="/admin/tours" className="block p-3 md:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-2 md:gap-3">
                <Icon name="Plus" size={18} className="text-primary md:w-5 md:h-5" />
                <div>
                  <div className="text-sm md:text-base font-semibold">Добавить тур</div>
                  <div className="text-xs md:text-sm text-gray-600">Новое предложение</div>
                </div>
              </div>
            </a>
            
            <a href="/admin/submissions" className="block p-3 md:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-2 md:gap-3">
                <Icon name="Mail" size={18} className="text-primary md:w-5 md:h-5" />
                <div>
                  <div className="text-sm md:text-base font-semibold">Заявки</div>
                  <div className="text-xs md:text-sm text-gray-600">Обработать запросы</div>
                </div>
              </div>
            </a>

            <a href="/admin/reviews" className="block p-3 md:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-2 md:gap-3">
                <Icon name="CheckCircle" size={18} className="text-primary md:w-5 md:h-5" />
                <div>
                  <div className="text-sm md:text-base font-semibold">Модерация</div>
                  <div className="text-xs md:text-sm text-gray-600">
                    {stats.pendingReviews > 0 
                      ? `${stats.pendingReviews} отзывов` 
                      : 'Все проверены'}
                  </div>
                </div>
              </div>
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Video" size={24} className="text-primary" />
              Видео на главной
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 md:space-y-4">
            <div>
              <label className="text-xs md:text-sm font-medium text-gray-700 mb-2 block">
                YouTube ссылка
              </label>
              <Input
                type="url"
                placeholder="youtube.com/shorts/..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="text-sm"
              />
              <div className="mt-2 p-2 md:p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-xs text-green-800 mb-1 font-semibold">✅ Поддержка:</p>
                <ul className="text-xs text-green-700 space-y-0.5">
                  <li>🎬 YouTube видео</li>
                  <li>📱 YouTube Shorts</li>
                </ul>
              </div>
            </div>
            <Button
              onClick={() => {
                localStorage.setItem('hero_video_url', videoUrl);
                toast({
                  title: '✅ Видео сохранено',
                  description: 'Обновите главную страницу'
                });
              }}
              className="w-full text-sm"
            >
              <Icon name="Save" size={14} className="mr-2" />
              Сохранить видео
            </Button>
            {videoUrl && (
              <Button
                variant="outline"
                onClick={() => {
                  setVideoUrl('');
                  localStorage.removeItem('hero_video_url');
                  toast({
                    title: '🗑️ Видео удалено',
                    description: 'Будет слайд-шоу'
                  });
                }}
                className="w-full text-sm"
              >
                <Icon name="Trash2" size={14} className="mr-2" />
                Удалить
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <Icon name="Layout" size={20} className="text-primary md:w-6 md:h-6" />
              Положение текста
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 md:space-y-4">
            <div>
              <label className="text-xs md:text-sm font-medium text-gray-700 mb-2 block">
                Выберите расположение
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setHeroPosition('top')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    heroPosition === 'top' 
                      ? 'border-primary bg-primary/10' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon name="ArrowUp" size={20} className="mx-auto mb-1" />
                  <div className="text-xs font-medium">Верх</div>
                </button>
                <button
                  onClick={() => setHeroPosition('center')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    heroPosition === 'center' 
                      ? 'border-primary bg-primary/10' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon name="Minus" size={20} className="mx-auto mb-1" />
                  <div className="text-xs font-medium">Центр</div>
                </button>
                <button
                  onClick={() => setHeroPosition('bottom')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    heroPosition === 'bottom' 
                      ? 'border-primary bg-primary/10' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon name="ArrowDown" size={20} className="mx-auto mb-1" />
                  <div className="text-xs font-medium">Низ</div>
                </button>
              </div>
            </div>
            <Button
              onClick={() => {
                localStorage.setItem('hero_position', heroPosition);
                toast({
                  title: '✅ Положение сохранено',
                  description: 'Обновите главную страницу'
                });
              }}
              className="w-full text-sm"
            >
              <Icon name="Save" size={14} className="mr-2" />
              Сохранить
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Type" size={24} className="text-primary" />
              Текст на главной
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 md:space-y-4">
            <div>
              <label className="text-xs md:text-sm font-medium text-gray-700 mb-2 block">
                Главный лозунг
              </label>
              <Input
                type="text"
                placeholder="Откройте мир вместе с нами"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="text-sm"
              />
            </div>
            <div>
              <label className="text-xs md:text-sm font-medium text-gray-700 mb-2 block">
                Подзаголовок
              </label>
              <Input
                type="text"
                placeholder="Туры из Санкт-Петербурга по лучшим ценам"
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                className="text-sm"
              />
            </div>
            <Button
              onClick={() => {
                localStorage.setItem('hero_title', heroTitle);
                localStorage.setItem('hero_subtitle', heroSubtitle);
                toast({
                  title: '✅ Текст сохранён',
                  description: 'Обновите главную страницу'
                });
              }}
              className="w-full text-sm"
            >
              <Icon name="Save" size={14} className="mr-2" />
              Сохранить текст
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}