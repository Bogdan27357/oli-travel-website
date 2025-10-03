import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { adminAPI } from '@/lib/admin-api';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Review {
  id: number;
  user_name: string;
  user_avatar?: string;
  tour_name: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

type FilterType = 'all' | 'pending' | 'approved' | 'rejected';

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');
  const { toast } = useToast();

  const loadReviews = async (statusFilter: FilterType = filter) => {
    setLoading(true);
    try {
      const data = await adminAPI.reviews.list(statusFilter);
      setReviews(data.reviews || []);
    } catch (error) {
      console.error('Error loading reviews:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить отзывы',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [filter]);

  const handleApprove = async (id: number) => {
    try {
      await adminAPI.reviews.approve(id);
      toast({
        title: 'Успешно',
        description: 'Отзыв одобрен',
      });
      loadReviews();
    } catch (error) {
      console.error('Error approving review:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось одобрить отзыв',
        variant: 'destructive',
      });
    }
  };

  const handleReject = async (id: number) => {
    try {
      await adminAPI.reviews.reject(id);
      toast({
        title: 'Успешно',
        description: 'Отзыв отклонен',
      });
      loadReviews();
    } catch (error) {
      console.error('Error rejecting review:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось отклонить отзыв',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await adminAPI.reviews.delete(id);
      toast({
        title: 'Успешно',
        description: 'Отзыв удален',
      });
      loadReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить отзыв',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">
            <Icon name="Clock" size={14} className="mr-1" />
            На модерации
          </Badge>
        );
      case 'approved':
        return (
          <Badge className="bg-green-500 hover:bg-green-600 text-white">
            <Icon name="CheckCircle" size={14} className="mr-1" />
            Одобрен
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-500 hover:bg-red-600 text-white">
            <Icon name="XCircle" size={14} className="mr-1" />
            Отклонен
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <Icon
            key={index}
            name="Star"
            size={16}
            className={
              index < rating
                ? 'text-yellow-500 fill-yellow-500'
                : 'text-gray-300'
            }
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

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
        <h1 className="text-3xl font-bold mb-2">Отзывы</h1>
        <p className="text-gray-600">Модерация отзывов клиентов</p>
      </div>

      <Tabs value={filter} onValueChange={(value) => setFilter(value as FilterType)} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="all" className="gap-2">
            Все
            <Badge variant="secondary" className="ml-1">
              {reviews.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="pending" className="gap-2">
            На модерации
            <Badge variant="secondary" className="ml-1">
              {reviews.filter((r) => r.status === 'pending').length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="approved" className="gap-2">
            Одобрены
            <Badge variant="secondary" className="ml-1">
              {reviews.filter((r) => r.status === 'approved').length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="rejected" className="gap-2">
            Отклонены
            <Badge variant="secondary" className="ml-1">
              {reviews.filter((r) => r.status === 'rejected').length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-6">
          {reviews.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Icon name="MessageSquare" size={64} className="text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Нет отзывов
                </h3>
                <p className="text-gray-500 text-center">
                  {filter === 'all'
                    ? 'Пока не поступило ни одного отзыва'
                    : `Нет отзывов со статусом "${
                        filter === 'pending'
                          ? 'На модерации'
                          : filter === 'approved'
                          ? 'Одобрен'
                          : 'Отклонен'
                      }"`}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <Card key={review.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={review.user_avatar} alt={review.user_name} />
                          <AvatarFallback className="bg-primary text-white">
                            {getInitials(review.user_name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg">
                            {review.user_name}
                          </h3>
                          <p className="text-sm text-gray-600 truncate">
                            {review.tour_name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            {renderStars(review.rating)}
                            <span className="text-sm text-gray-500">
                              {review.rating}/5
                            </span>
                          </div>
                        </div>
                      </div>
                      {getStatusBadge(review.status)}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {review.comment}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-sm text-gray-500">
                        {formatDate(review.created_at)}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        {review.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              className="bg-green-500 hover:bg-green-600 text-white gap-1"
                              onClick={() => handleApprove(review.id)}
                            >
                              <Icon name="Check" size={16} />
                              Одобрить
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-500 text-red-500 hover:bg-red-50 gap-1"
                              onClick={() => handleReject(review.id)}
                            >
                              <Icon name="X" size={16} />
                              Отклонить
                            </Button>
                          </>
                        )}
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="gap-1"
                            >
                              <Icon name="Trash2" size={16} />
                              {review.status === 'pending' ? '' : 'Удалить'}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Удалить отзыв?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Это действие нельзя отменить. Отзыв от "{review.user_name}" будет удален навсегда.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Отмена</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(review.id)}
                                className="bg-red-500 hover:bg-red-600"
                              >
                                Удалить
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
