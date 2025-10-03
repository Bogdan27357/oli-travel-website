import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { adminAPI } from '@/lib/admin-api';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Submission {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'new' | 'in_progress' | 'completed';
  created_at: string;
}

type FilterType = 'all' | 'new' | 'in_progress' | 'completed';

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');
  const { toast } = useToast();

  const loadSubmissions = async (statusFilter: FilterType = filter) => {
    setLoading(true);
    try {
      const data = await adminAPI.submissions.list(statusFilter);
      setSubmissions(data.submissions || []);
    } catch (error) {
      console.error('Error loading submissions:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить заявки',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, [filter]);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await adminAPI.submissions.updateStatus(id, newStatus);
      toast({
        title: 'Успешно',
        description: 'Статус заявки обновлен',
      });
      loadSubmissions();
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось обновить статус',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await adminAPI.submissions.delete(id);
      toast({
        title: 'Успешно',
        description: 'Заявка удалена',
      });
      loadSubmissions();
    } catch (error) {
      console.error('Error deleting submission:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить заявку',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return (
          <Badge className="bg-red-500 hover:bg-red-600 text-white">
            Новая
          </Badge>
        );
      case 'in_progress':
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">
            В работе
          </Badge>
        );
      case 'completed':
        return (
          <Badge className="bg-green-500 hover:bg-green-600 text-white">
            Завершена
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateText = (text: string, maxLength: number = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const getFilterCount = (statusFilter: FilterType) => {
    if (statusFilter === 'all') return submissions.length;
    return submissions.filter(s => s.status === statusFilter).length;
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
        <h1 className="text-3xl font-bold mb-2">Заявки</h1>
        <p className="text-gray-600">Управление заявками с сайта</p>
      </div>

      <Tabs value={filter} onValueChange={(value) => setFilter(value as FilterType)} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="all" className="gap-2">
            Все
            <Badge variant="secondary" className="ml-1">{submissions.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="new" className="gap-2">
            Новые
            <Badge variant="secondary" className="ml-1">
              {submissions.filter(s => s.status === 'new').length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="in_progress" className="gap-2">
            В работе
            <Badge variant="secondary" className="ml-1">
              {submissions.filter(s => s.status === 'in_progress').length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="completed" className="gap-2">
            Завершены
            <Badge variant="secondary" className="ml-1">
              {submissions.filter(s => s.status === 'completed').length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-6">
          {submissions.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Icon name="Inbox" size={64} className="text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Нет заявок
                </h3>
                <p className="text-gray-500 text-center">
                  {filter === 'all' 
                    ? 'Пока не поступило ни одной заявки' 
                    : `Нет заявок со статусом "${filter === 'new' ? 'Новая' : filter === 'in_progress' ? 'В работе' : 'Завершена'}"`}
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block">
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Имя
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Телефон
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Сообщение
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Статус
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Дата
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Действия
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {submissions.map((submission) => (
                            <tr key={submission.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                #{submission.id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {submission.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {submission.email}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {submission.phone}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                                <span title={submission.message}>
                                  {truncateText(submission.message)}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {getStatusBadge(submission.status)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {formatDate(submission.created_at)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <div className="flex items-center gap-2">
                                  <Select
                                    value={submission.status}
                                    onValueChange={(value) =>
                                      handleStatusChange(submission.id, value)
                                    }
                                  >
                                    <SelectTrigger className="w-[140px] h-8">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="new">Новая</SelectItem>
                                      <SelectItem value="in_progress">В работе</SelectItem>
                                      <SelectItem value="completed">Завершена</SelectItem>
                                    </SelectContent>
                                  </Select>

                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button
                                        variant="destructive"
                                        size="icon"
                                        className="h-8 w-8"
                                      >
                                        <Icon name="Trash2" size={16} />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Удалить заявку?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Это действие нельзя отменить. Заявка будет удалена навсегда.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Отмена</AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() => handleDelete(submission.id)}
                                          className="bg-red-500 hover:bg-red-600"
                                        >
                                          Удалить
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {submissions.map((submission) => (
                  <Card key={submission.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            {submission.name}
                          </CardTitle>
                          <p className="text-sm text-gray-500 mt-1">
                            #{submission.id} • {formatDate(submission.created_at)}
                          </p>
                        </div>
                        {getStatusBadge(submission.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                          <Icon name="Mail" size={16} />
                          <span>{submission.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Icon name="Phone" size={16} />
                          <span>{submission.phone}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t">
                        <p className="text-sm text-gray-700 mb-3">
                          {submission.message}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2 pt-2 border-t">
                        <Select
                          value={submission.status}
                          onValueChange={(value) =>
                            handleStatusChange(submission.id, value)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">Новая</SelectItem>
                            <SelectItem value="in_progress">В работе</SelectItem>
                            <SelectItem value="completed">Завершена</SelectItem>
                          </SelectContent>
                        </Select>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" className="w-full">
                              <Icon name="Trash2" size={16} className="mr-2" />
                              Удалить заявку
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Удалить заявку?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Это действие нельзя отменить. Заявка будет удалена навсегда.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Отмена</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(submission.id)}
                                className="bg-red-500 hover:bg-red-600"
                              >
                                Удалить
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
