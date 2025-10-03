import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Booking {
  id: number;
  tour_title: string;
  hotel: string;
  dates: string;
  price: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  adults: number;
  children: number;
  comment?: string;
  created_at: string;
}

export default function Admin() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchBookings();
  }, [page]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://functions.poehali.dev/2c164285-e0f9-4f4c-8bb9-024662da97da?page=${page}&limit=20`);
      
      if (!response.ok) {
        throw new Error('Ошибка загрузки данных');
      }

      const data = await response.json();
      setBookings(data.bookings);
      setTotalPages(data.total_pages);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить заявки",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter(booking => 
    booking.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.tour_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Админ-панель
            </h1>
            <p className="text-gray-600 mt-2">Управление заявками на туры</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/'}
            className="gap-2"
          >
            <Icon name="Home" size={18} />
            На главную
          </Button>
        </div>

        <Card className="p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Поиск по имени, email или туру..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button onClick={fetchBookings} variant="outline" size="icon">
                <Icon name="RefreshCw" size={18} />
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <Icon name="Loader2" size={48} className="mx-auto text-primary animate-spin mb-4" />
              <p className="text-gray-500">Загрузка заявок...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="Inbox" size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">Заявки не найдены</p>
            </div>
          ) : (
            <>
              <div className="rounded-lg border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold">Дата</TableHead>
                      <TableHead className="font-semibold">Клиент</TableHead>
                      <TableHead className="font-semibold">Контакты</TableHead>
                      <TableHead className="font-semibold">Тур</TableHead>
                      <TableHead className="font-semibold">Отель</TableHead>
                      <TableHead className="font-semibold">Даты</TableHead>
                      <TableHead className="font-semibold">Гости</TableHead>
                      <TableHead className="font-semibold">Цена</TableHead>
                      <TableHead className="font-semibold">Комментарий</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map((booking) => (
                      <TableRow key={booking.id} className="hover:bg-gray-50">
                        <TableCell className="text-sm text-gray-600">
                          {formatDate(booking.created_at)}
                        </TableCell>
                        <TableCell className="font-medium">{booking.customer_name}</TableCell>
                        <TableCell className="text-sm">
                          <div className="flex flex-col gap-1">
                            <a href={`mailto:${booking.customer_email}`} className="text-primary hover:underline flex items-center gap-1">
                              <Icon name="Mail" size={12} />
                              {booking.customer_email}
                            </a>
                            <a href={`tel:${booking.customer_phone}`} className="text-primary hover:underline flex items-center gap-1">
                              <Icon name="Phone" size={12} />
                              {booking.customer_phone}
                            </a>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{booking.tour_title}</TableCell>
                        <TableCell className="text-sm text-gray-600">{booking.hotel}</TableCell>
                        <TableCell className="text-sm text-gray-600">{booking.dates}</TableCell>
                        <TableCell className="text-sm">
                          {booking.adults} взр. / {booking.children} дет.
                        </TableCell>
                        <TableCell className="font-bold text-primary">
                          {booking.price.toLocaleString()} ₽
                        </TableCell>
                        <TableCell className="text-sm text-gray-600 max-w-xs truncate">
                          {booking.comment || '—'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    <Icon name="ChevronLeft" size={16} />
                    Назад
                  </Button>
                  <span className="text-sm text-gray-600">
                    Страница {page} из {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    Вперед
                    <Icon name="ChevronRight" size={16} />
                  </Button>
                </div>
              )}
            </>
          )}
        </Card>
      </div>
    </div>
  );
}