import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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

interface Tour {
  id?: number;
  country: string;
  city: string;
  hotel: string;
  stars: number;
  date_from: string;
  date_to: string;
  nights: number;
  people: number;
  flight: boolean;
  price: number;
  old_price: number;
  image_url: string;
  description: string;
  included: string[];
  is_hot: boolean;
  is_active: boolean;
}

const emptyTour: Tour = {
  country: '',
  city: '',
  hotel: '',
  stars: 5,
  date_from: '',
  date_to: '',
  nights: 7,
  people: 2,
  flight: true,
  price: 0,
  old_price: 0,
  image_url: '',
  description: '',
  included: [],
  is_hot: false,
  is_active: true,
};

export default function AdminTours() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [formData, setFormData] = useState<Tour>(emptyTour);
  const { toast } = useToast();

  const loadTours = async () => {
    setLoading(true);
    try {
      const data = await adminAPI.tours.list();
      setTours(data.tours || []);
      setFilteredTours(data.tours || []);
    } catch (error) {
      console.error('Error loading tours:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить туры',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTours();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTours(tours);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredTours(
        tours.filter(
          (tour) =>
            tour.country.toLowerCase().includes(query) ||
            tour.city.toLowerCase().includes(query) ||
            tour.hotel.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, tours]);

  const openCreateModal = () => {
    setEditingTour(null);
    setFormData(emptyTour);
    setIsModalOpen(true);
  };

  const openEditModal = (tour: Tour) => {
    setEditingTour(tour);
    setFormData(tour);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTour(null);
    setFormData(emptyTour);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: Number(value) });
  };

  const handleIncludedChange = (value: string) => {
    const included = value.split(',').map((item) => item.trim()).filter(Boolean);
    setFormData({ ...formData, included });
  };

  const handleSubmit = async () => {
    try {
      if (editingTour) {
        await adminAPI.tours.update({ ...formData, id: editingTour.id });
        toast({
          title: 'Успешно',
          description: 'Тур обновлен',
        });
      } else {
        await adminAPI.tours.create(formData);
        toast({
          title: 'Успешно',
          description: 'Тур создан',
        });
      }
      closeModal();
      loadTours();
    } catch (error) {
      console.error('Error saving tour:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить тур',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await adminAPI.tours.delete(id);
      toast({
        title: 'Успешно',
        description: 'Тур удален',
      });
      loadTours();
    } catch (error) {
      console.error('Error deleting tour:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить тур',
        variant: 'destructive',
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Туры</h1>
          <p className="text-gray-600">Управление турами на сайте</p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateModal} className="gap-2">
              <Icon name="Plus" size={20} />
              Добавить тур
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTour ? 'Редактировать тур' : 'Создать тур'}
              </DialogTitle>
              <DialogDescription>
                Заполните информацию о туре
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="country">Страна</Label>
                <Input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Турция"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Город</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Анталия"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hotel">Отель</Label>
                <Input
                  id="hotel"
                  name="hotel"
                  value={formData.hotel}
                  onChange={handleInputChange}
                  placeholder="Grand Resort"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stars">Звезды</Label>
                <Select
                  value={String(formData.stars)}
                  onValueChange={(value) => handleSelectChange('stars', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 звезда</SelectItem>
                    <SelectItem value="2">2 звезды</SelectItem>
                    <SelectItem value="3">3 звезды</SelectItem>
                    <SelectItem value="4">4 звезды</SelectItem>
                    <SelectItem value="5">5 звезд</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date_from">Дата начала</Label>
                <Input
                  id="date_from"
                  name="date_from"
                  type="date"
                  value={formData.date_from}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date_to">Дата окончания</Label>
                <Input
                  id="date_to"
                  name="date_to"
                  type="date"
                  value={formData.date_to}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nights">Ночей</Label>
                <Input
                  id="nights"
                  name="nights"
                  type="number"
                  min="1"
                  value={formData.nights}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="people">Человек</Label>
                <Input
                  id="people"
                  name="people"
                  type="number"
                  min="1"
                  value={formData.people}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Цена (₽)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="old_price">Старая цена (₽)</Label>
                <Input
                  id="old_price"
                  name="old_price"
                  type="number"
                  min="0"
                  value={formData.old_price}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="image_url">URL изображения</Label>
                <Input
                  id="image_url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Описание тура..."
                  rows={4}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="included">Что включено (через запятую)</Label>
                <Input
                  id="included"
                  value={formData.included.join(', ')}
                  onChange={(e) => handleIncludedChange(e.target.value)}
                  placeholder="Перелет, Питание, Трансфер"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="flight"
                  checked={formData.flight}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange('flight', checked as boolean)
                  }
                />
                <Label htmlFor="flight" className="cursor-pointer">
                  Включен перелет
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_hot"
                  checked={formData.is_hot}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange('is_hot', checked as boolean)
                  }
                />
                <Label htmlFor="is_hot" className="cursor-pointer">
                  Горящий тур
                </Label>
              </div>

              <div className="flex items-center space-x-2 md:col-span-2">
                <Checkbox
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange('is_active', checked as boolean)
                  }
                />
                <Label htmlFor="is_active" className="cursor-pointer">
                  Активный
                </Label>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={closeModal}>
                Отмена
              </Button>
              <Button onClick={handleSubmit}>
                {editingTour ? 'Сохранить' : 'Создать'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-md">
          <Icon
            name="Search"
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <Input
            placeholder="Поиск по стране, городу или отелю..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSearchQuery('')}
          disabled={!searchQuery}
        >
          <Icon name="X" size={20} />
        </Button>
      </div>

      {filteredTours.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Icon name="Plane" size={64} className="text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {searchQuery ? 'Туры не найдены' : 'Нет туров'}
            </h3>
            <p className="text-gray-500 text-center mb-4">
              {searchQuery
                ? 'Попробуйте изменить параметры поиска'
                : 'Добавьте первый тур, нажав кнопку выше'}
            </p>
            {searchQuery && (
              <Button variant="outline" onClick={() => setSearchQuery('')}>
                Сбросить фильтр
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTours.map((tour) => (
            <Card key={tour.id} className="overflow-hidden">
              <div className="relative h-48">
                <img
                  src={tour.image_url || '/placeholder.jpg'}
                  alt={tour.hotel}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  {tour.is_hot && (
                    <Badge className="bg-red-500 hover:bg-red-600 text-white">
                      <Icon name="Flame" size={14} className="mr-1" />
                      Горящий
                    </Badge>
                  )}
                  {!tour.is_active && (
                    <Badge variant="secondary">
                      Неактивный
                    </Badge>
                  )}
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>{tour.country}, {tour.city}</span>
                  <div className="flex">
                    {[...Array(tour.stars)].map((_, i) => (
                      <Icon key={i} name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </CardTitle>
                <p className="text-sm text-gray-600">{tour.hotel}</p>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Icon name="Calendar" size={16} />
                    <span>{formatDate(tour.date_from)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Icon name="Moon" size={16} />
                    <span>{tour.nights} ночей</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Icon name="Users" size={16} />
                    <span>{tour.people} чел.</span>
                  </div>
                  {tour.flight && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Icon name="Plane" size={16} />
                      <span>Перелет</span>
                    </div>
                  )}
                </div>

                {tour.description && (
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {tour.description}
                  </p>
                )}

                <div className="flex items-end justify-between pt-2 border-t">
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {tour.price.toLocaleString()} ₽
                    </div>
                    {tour.old_price > 0 && (
                      <div className="text-sm text-gray-500 line-through">
                        {tour.old_price.toLocaleString()} ₽
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openEditModal(tour)}
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Удалить тур?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Это действие нельзя отменить. Тур "{tour.hotel}" будет удален навсегда.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Отмена</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(tour.id!)}
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
    </div>
  );
}
