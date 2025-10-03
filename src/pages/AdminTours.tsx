import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { adminAPI } from '@/lib/admin-api';
import { useToast } from '@/hooks/use-toast';
import TourFormDialog from '@/components/admin/TourFormDialog';
import ToursList from '@/components/admin/ToursList';

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
        <Button onClick={openCreateModal} className="gap-2">
          <Icon name="Plus" size={20} />
          Добавить тур
        </Button>
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

      <ToursList
        tours={filteredTours}
        searchQuery={searchQuery}
        onEdit={openEditModal}
        onDelete={handleDelete}
        onClearSearch={() => setSearchQuery('')}
        formatDate={formatDate}
      />

      <TourFormDialog
        isOpen={isModalOpen}
        editingTour={editingTour}
        formData={formData}
        onClose={closeModal}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
        onCheckboxChange={handleCheckboxChange}
        onSelectChange={handleSelectChange}
        onIncludedChange={handleIncludedChange}
      />
    </div>
  );
}