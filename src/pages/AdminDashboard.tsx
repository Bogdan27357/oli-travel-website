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
  const { toast } = useToast();

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Панель управления</h1>
        <p className="text-gray-600">Обзор системы управления сайтом</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title} className="overflow-hidden">
            <CardHeader className={`bg-gradient-to-r ${stat.color} text-white pb-2`}>
              <Icon name={stat.icon as any} size={32} />
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Activity" size={24} className="text-primary" />
              Быстрые действия
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <a href="/admin/tours" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <Icon name="Plus" size={20} className="text-primary" />
                <div>
                  <div className="font-semibold">Добавить тур</div>
                  <div className="text-sm text-gray-600">Создать новое предложение</div>
                </div>
              </div>
            </a>
            
            <a href="/admin/submissions" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <Icon name="Mail" size={20} className="text-primary" />
                <div>
                  <div className="font-semibold">Просмотреть заявки</div>
                  <div className="text-sm text-gray-600">Обработать новые запросы</div>
                </div>
              </div>
            </a>

            <a href="/admin/reviews" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <Icon name="CheckCircle" size={20} className="text-primary" />
                <div>
                  <div className="font-semibold">Модерация отзывов</div>
                  <div className="text-sm text-gray-600">
                    {stats.pendingReviews > 0 
                      ? `${stats.pendingReviews} отзывов ждут проверки` 
                      : 'Все отзывы проверены'}
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
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                URL видео (MP4)
              </label>
              <Input
                type="url"
                placeholder="https://example.com/video.mp4"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
              <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-xs text-green-800 mb-2 font-semibold">✅ Поддерживаемые форматы:</p>
                <ul className="text-xs text-green-700 space-y-1">
                  <li>🎬 YouTube (просто вставьте ссылку)</li>
                  <li>📹 Прямая ссылка на .mp4 файл</li>
                  <li>📱 Telegram (скопируйте ссылку на видео)</li>
                </ul>
              </div>
              <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-800 mb-2 font-semibold">📹 Как загрузить:</p>
                <ol className="text-xs text-blue-700 space-y-1">
                  <li><strong>Вариант 1 (YouTube):</strong> Загрузите на YouTube → скопируйте ссылку</li>
                  <li><strong>Вариант 2 (Telegram):</strong> Загрузите в чат → web.telegram.org → скопируйте ссылку</li>
                  <li><strong>Вариант 3:</strong> Используйте прямую ссылку на MP4</li>
                </ol>
              </div>
              {videoUrl && (
                <div className="mt-2">
                  <p className="text-xs font-medium text-gray-700 mb-1">Предпросмотр:</p>
                  <video 
                    src={videoUrl} 
                    className="w-full max-h-32 rounded border"
                    controls
                    onError={() => {
                      toast({
                        title: '❌ Ошибка загрузки',
                        description: 'Проверьте ссылку на видео',
                        variant: 'destructive'
                      });
                    }}
                  />
                </div>
              )}
            </div>
            <Button
              onClick={() => {
                localStorage.setItem('hero_video_url', videoUrl);
                toast({
                  title: '✅ Видео сохранено',
                  description: 'Обновите главную страницу чтобы увидеть изменения'
                });
              }}
              className="w-full"
            >
              <Icon name="Save" size={16} className="mr-2" />
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
                    description: 'Будет показываться слайд-шоу'
                  });
                }}
                className="w-full"
              >
                <Icon name="Trash2" size={16} className="mr-2" />
                Удалить видео
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Music" size={24} className="text-primary" />
              Фоновая музыка
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                URL музыки (MP3)
              </label>
              <Input
                type="url"
                placeholder="https://example.com/music.mp3"
                value={musicUrl}
                onChange={(e) => setMusicUrl(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Вставьте прямую ссылку на аудио файл MP3
              </p>
            </div>
            <Button
              onClick={() => {
                localStorage.setItem('hero_music_url', musicUrl);
                toast({
                  title: '✅ Музыка сохранена',
                  description: 'Обновите главную страницу чтобы услышать музыку'
                });
              }}
              className="w-full"
            >
              <Icon name="Save" size={16} className="mr-2" />
              Сохранить музыку
            </Button>
            {musicUrl && (
              <Button
                variant="outline"
                onClick={() => {
                  setMusicUrl('');
                  localStorage.removeItem('hero_music_url');
                  toast({
                    title: '🗑️ Музыка удалена',
                    description: 'Слайд-шоу будет без звука'
                  });
                }}
                className="w-full"
              >
                <Icon name="Trash2" size={16} className="mr-2" />
                Удалить музыку
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Info" size={24} className="text-primary" />
              Информация
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Icon name="Server" size={20} className="text-blue-600 mt-0.5" />
                <div>
                  <div className="font-semibold text-blue-900">Backend функции</div>
                  <div className="text-sm text-blue-700 mt-1">
                    Все функции развернуты и работают
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Icon name="Database" size={20} className="text-green-600 mt-0.5" />
                <div>
                  <div className="font-semibold text-green-900">База данных</div>
                  <div className="text-sm text-green-700 mt-1">
                    Подключена и готова к работе
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Icon name="Zap" size={20} className="text-purple-600 mt-0.5" />
                <div>
                  <div className="font-semibold text-purple-900">Email уведомления</div>
                  <div className="text-sm text-purple-700 mt-1">
                    Заявки отправляются на bogdan273@yandex.ru
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}